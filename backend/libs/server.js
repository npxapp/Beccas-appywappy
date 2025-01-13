    const fs = require('fs').promises; // Use promises API for async file handling
    const http = require('http');
    const express = require('express');
    const bodyParser = require('body-parser');
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    const { Pool } = require('pg');
    const axios = require('axios');
    const opentelemetry = require('@opentelemetry/api');
    const { Resource } = require('@opentelemetry/resources');
    const { SEMRESATTRS_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');
    const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
    const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
    const path = require('path');
    const multer = require('multer');
    const { format } = require('util'); // To format the query with placeholders

    // Express App Setup
    const app = express();
    app.use(bodyParser.json());

    // Load Configuration Asynchronously
    const loadConfig = async () => {
      try {
        const configData = await fs.readFile('server.json', 'utf8');
        return JSON.parse(configData);
      } catch (error) {
        console.error('Error loading configuration:', error);
        throw error;
      }
    };

    const JWT_SECRET = 'your-secret-key'; // In production, use environment variable
    
    // Database Operations Layer
    class DboPostgres {
      constructor(config) {
        this.pool = new Pool(config);
      }
    
      async connect() {
        try {
          await this.pool.connect();
          return true;
        } catch (error) {
          console.error('Database connection error:', error);
          throw error;
        }
      }
    
        async createTable(tableName, columns) {
          // Log the input parameters to ensure correct columns are being passed
          
          // Generate the column definitions for the SQL query
          const columnDefinitions = Object.entries(columns)
            .map(([name, type]) => {
              // Log each column being processed
              console.log(`Processing column: ${name} with type: ${type}`);
              return `${name} ${type}`;
            })
            .join(', ');
        
          // Log the final SQL query that will be executed
          const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions})`;
        
          // Execute the query
          await this.execute(query);
        }  
      
    async deleteTable(tableName) {
      const query = `DROP TABLE IF EXISTS ${tableName} CASCADE`;
      await this.execute(query);
    }
      
      async addColumn(tableName, columnName, columnType) {
        const query = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`;
        await this.execute(query);
      }
    
      async dropColumn(tableName, columnName) {
        const query = `ALTER TABLE ${tableName} DROP COLUMN IF EXISTS ${columnName}`;
        await this.execute(query);
      }
    
      async execute(query, params = []) {
        const client = await this.pool.connect();
        try {
          const result = await client.query(query, params);
          return result.rows;
        } finally {
          client.release();
        }
      }
    
      async insert(tableName, data) {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const placeholders = values.map((_, i) => `$${i + 1}`);
        
        const query = `
          INSERT INTO ${tableName} (${columns.join(', ')})
          VALUES (${placeholders.join(', ')})
          RETURNING *
        `;
        
        return (await this.execute(query, values))[0];
      }

    async find(tableName, conditions = {}, options = {}) {
      const whereClauses = [];
      const values = [];
    
      Object.entries(conditions).forEach(([key, value], index) => {
        if (Array.isArray(value)) {
          // Generate `IN` clause for arrays
          const placeholders = value.map((_, i) => `$${values.length + i + 1}`).join(', ');
          whereClauses.push(`${key} IN (${placeholders})`);
          values.push(...value);
        } else {
          whereClauses.push(`${key} = $${values.length + 1}`);
          values.push(value);
        }
      });
    
      const whereClause = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';
      const orderByClause = options.orderBy ? `ORDER BY ${options.orderBy}` : '';
      const limitClause = options.limit ? `LIMIT ${options.limit}` : '';
      const offsetClause = options.offset ? `OFFSET ${options.offset}` : '';
    
      const query = `
        SELECT * FROM ${tableName}
        ${whereClause}
        ${orderByClause}
        ${limitClause}
        ${offsetClause}
      `;
      
      return await this.execute(query, values);
    }
    
      async update(tableName, data, conditions) {
        const setClause = Object.keys(data)
          .map((key, i) => `${key} = $${i + 1}`)
          .join(', ');
        
        const whereClause = Object.keys(conditions)
          .map((key, i) => `${key} = $${i + Object.keys(data).length + 1}`)
          .join(' AND ');
        
        const query = `
          UPDATE ${tableName}
          SET ${setClause}
          WHERE ${whereClause}
          RETURNING *
        `;
        
        const values = [...Object.values(data), ...Object.values(conditions)];
        return await this.execute(query, values);
      }
    
      async delete(tableName, conditions) {
        const whereClause = Object.keys(conditions)
          .map((key, i) => `${key} = $${i + 1}`)
          .join(' AND ');
        
        const query = `
          DELETE FROM ${tableName}
          WHERE ${whereClause}
          RETURNING *
        `;
        
        return await this.execute(query, Object.values(conditions));
      }
    }

    // Service Layer
    class ContentService {
      constructor(dbo) {
        this.dbo = dbo;
      }
    
      async createContent(tableName, data) {
        return await this.dbo.insert(tableName, data);
      }
    
      async getContent(tableName, conditions = {}, options = {}) {
        return await this.dbo.find(tableName, conditions, options);
      }
    
      async updateContent(tableName, data, conditions) {
        return await this.dbo.update(tableName, data, conditions);
      }
    
      async deleteContent(tableName, conditions) {
        return await this.dbo.delete(tableName, conditions);
      }
    }

    // Middleware
    const authMiddleware = (req, res, next) => {
      try {
        // Get the Authorization header and check Bearer scheme
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({
            error: 'Authentication required',
            details: 'No valid authorization header found'
          });
        }
    
        // Extract and verify token
        const token = authHeader.split(' ')[1];
        
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          
          // Attach user info to request for use in routes
          req.user = {
            id: decoded.id,
            username: decoded.username
          };
          
          // Optional: Add token refresh if expiring soon
          if (decoded.exp && decoded.exp - Date.now() / 1000 < 3600) { // Less than 1 hour left
            const newToken = jwt.sign(
              { id: decoded.id, username: decoded.username },
              JWT_SECRET,
              { expiresIn: '24h' }
            );
            res.setHeader('X-New-Token', newToken);
          }
          
          next();
        } catch (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
              error: 'Token expired',
              details: 'Please login again'
            });
          }
          if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
              error: 'Invalid token',
              details: 'Token validation failed'
            });
          }
          throw err;
        }
      } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
          error: 'Authentication error',
          details: 'An unexpected error occurred'
        });
      }
    };

    // 1. Modify the admin user creation in startDbo function
    // Replace the existing admin user creation code with this:
    const createAdminUser = async (dbo) => {
      const adminPassword = 'admin'; // Change this in production!
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      // Check if admin exists
      const existingMeta = await dbo.find('peoplemeta', { 
        meta_key: 'admin_type', 
        meta_value: 'ESADMIN' 
      });
      
      if (existingMeta.length === 0) {
        console.log('No existing admin metadata found. Creating new user...');
        
        const newUser = await dbo.insert('people', {
          people_login: 'admin',
          people_pass: hashedPassword, // Now using hashed password
          people_nicename: 'Admin',
          people_email: 'root@localhost',
          people_url: 'domain.com',
          people_status: 1,
          display_name: 'Super User Admin'
        });
        
        console.log('New user created:', newUser);
        
        const newUserMeta = await dbo.insert('peoplemeta', {
          people_id: newUser.id,
          meta_key: 'admin_type',
          meta_value: 'ESADMIN'
        });
        
        console.log('New user metadata created:', newUserMeta);
      } else {
        console.log('Admin metadata already exists:', existingMeta);
      }
    };

    const startDbo = async (dbo) => {
      try {
        console.log("Connecting to the database...");
        await dbo.connect(); // Initialize the database connection
        console.log("Database connected.");
    
        // Create the database tables
        console.log("Creating tables...");
    
        // wp_users
        await dbo.createTable('people', {
          ID: 'BIGSERIAL PRIMARY KEY',
          people_login: 'VARCHAR(60) NOT NULL UNIQUE',
          people_pass: 'VARCHAR(255) NOT NULL',
          people_nicename: 'VARCHAR(50) NOT NULL',
          people_email: 'VARCHAR(100) NOT NULL',
          people_url: 'VARCHAR(100)',
          user_registered: 'TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP',
          people_activation_key: 'VARCHAR(255)',
          people_status: 'INTEGER NOT NULL DEFAULT 0',
          display_name: 'VARCHAR(250) NOT NULL',
        });
    
        // wp_usermeta
        await dbo.createTable('peoplemeta', {
          pmeta_id: 'BIGSERIAL PRIMARY KEY',
          people_id: 'BIGINT NOT NULL',
          meta_key: 'VARCHAR(255)',
          meta_value: 'TEXT',
        });
        
        // wp_posts
        await dbo.createTable('posts', {
          ID: 'BIGSERIAL PRIMARY KEY',
          post_author: 'BIGINT NOT NULL',
          post_date: 'TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP',
          post_date_gmt: 'TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP',
          post_content: 'TEXT',
          post_title: 'TEXT',
          post_excerpt: 'TEXT',
          post_status: 'VARCHAR(20) NOT NULL',
          comment_status: 'VARCHAR(20) NOT NULL',
          ping_status: 'VARCHAR(20) NOT NULL',
          post_password: 'VARCHAR(255)',
          post_name: 'VARCHAR(200)',
          to_ping: 'TEXT',
          pinged: 'TEXT',
          post_modified: 'TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP',
          post_modified_gmt: 'TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP',
          post_content_filtered: 'TEXT',
          post_parent: 'BIGINT NOT NULL DEFAULT 0',
          guid: 'VARCHAR(255)',
          menu_order: 'INTEGER NOT NULL DEFAULT 0',
          post_type: 'VARCHAR(20)',
          post_mime_type: 'VARCHAR(100)',
          comment_count: 'BIGINT NOT NULL DEFAULT 0',
        });
    
        // wp_postmeta
        await dbo.createTable('postmeta', {
          meta_id: 'BIGSERIAL PRIMARY KEY',
          post_id: 'BIGINT NOT NULL',
          meta_key: 'VARCHAR(255)',
          meta_value: 'TEXT',
        });
    
        // wp_links
        await dbo.createTable('links', {
          link_id: 'BIGSERIAL PRIMARY KEY',
          link_url: 'VARCHAR(255) NOT NULL',
          link_name: 'VARCHAR(255) NOT NULL',
          link_image: 'VARCHAR(255)',
          link_target: 'VARCHAR(25)',
          link_description: 'VARCHAR(255)',
          link_visible: 'VARCHAR(20) NOT NULL DEFAULT \'Y\'',
          link_owner: 'BIGINT NOT NULL DEFAULT 1',
          link_rating: 'INTEGER NOT NULL DEFAULT 0',
          link_updated: 'TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP',
          link_rel: 'VARCHAR(255)',
          link_notes: 'TEXT',
          link_rss: 'VARCHAR(255)',
        });
    
        // wp_terms
        await dbo.createTable('terms', {
          term_id: 'BIGSERIAL PRIMARY KEY',
          name: 'VARCHAR(200) NOT NULL',
          slug: 'VARCHAR(200) NOT NULL UNIQUE',
          term_group: 'BIGINT NOT NULL DEFAULT 0',
        });
    
        // wp_term_taxonomy
        await dbo.createTable('termtaxonomy', {
          term_taxonomy_id: 'BIGSERIAL PRIMARY KEY',
          term_id: 'BIGINT NOT NULL',
          taxonomy: 'VARCHAR(32) NOT NULL',
          description: 'TEXT',
          parent: 'BIGINT NOT NULL DEFAULT 0',
          count: 'BIGINT NOT NULL DEFAULT 0',
        });
    
        // wp_term_relationships
        await dbo.createTable('termrelationships', {
          object_id: 'BIGINT NOT NULL',
          term_taxonomy_id: 'BIGINT NOT NULL',
          term_order: 'INTEGER NOT NULL DEFAULT 0',
        });
    
        // wp_options
        await dbo.createTable('options', {
          option_id: 'BIGSERIAL PRIMARY KEY',
          option_name: 'VARCHAR(191) NOT NULL UNIQUE',
          option_value: 'TEXT NOT NULL',
          autoload: 'VARCHAR(20) NOT NULL DEFAULT \'yes\'',
        });
    
        // wp_comments
        await dbo.createTable('comments', {
          comment_ID: 'BIGSERIAL PRIMARY KEY',
          comment_post_ID: 'BIGINT NOT NULL',
          comment_author: 'TEXT NOT NULL',
          comment_author_email: 'VARCHAR(100)',
          comment_author_url: 'VARCHAR(200)',
          comment_author_IP: 'VARCHAR(100)',
          comment_date: 'TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP',
          comment_date_gmt: 'TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP',
          comment_content: 'TEXT NOT NULL',
          comment_karma: 'INTEGER NOT NULL DEFAULT 0',
          comment_approved: 'VARCHAR(20) NOT NULL',
          comment_agent: 'VARCHAR(255)',
          comment_type: 'VARCHAR(20)',
          comment_parent: 'BIGINT NOT NULL DEFAULT 0',
          people_id: 'BIGINT NOT NULL DEFAULT 0',
        });
    
        // wp_commentmeta
        await dbo.createTable('commentmeta', {
          meta_id: 'BIGSERIAL PRIMARY KEY',
          comment_id: 'BIGINT NOT NULL',
          meta_key: 'VARCHAR(255)',
          meta_value: 'TEXT',
        });
        
        // 4. Add this call to createAdminUser in your startDbo function
        // Inside startDbo, after creating all tables, add:
        await createAdminUser(dbo);
    
        console.log("Tables created.");
      } catch (error) {
        console.error("Failed to initialize the database:", error);
        throw error; // Re-throw the error to handle it in the server start
      }
    };

const startServer = async () => {
  try {
    
    const config = await loadConfig();
    // Initialize Database
    const dbo = new DboPostgres(config);
    //await dbo.connect();
    await startDbo(dbo); // Ensure the database is ready before starting the server
    const contentService = new ContentService(dbo);
    
    // 2. Modify the registration endpoint to properly handle password hashing
    // Replace the existing /auth/register route with this:
    app.post('/api/auth/register', async (req, res) => {
      try {
        const { username, password, email, displayName } = req.body;
        
        // Input validation
        if (!username || !password || !email) {
          return res.status(400).json({ 
            error: 'Missing required fields', 
            details: 'Username, password, and email are required' 
          });
        }
    
        // Check if username already exists
        const existingUser = await dbo.find('people', { people_login: username });
        if (existingUser.length > 0) {
          return res.status(409).json({ 
            error: 'Username already exists',
            details: 'Please choose a different username' 
          });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create the user with all required fields
        const user = await dbo.insert('people', {
          people_login: username,
          people_pass: hashedPassword,
          people_nicename: username.toLowerCase(),
          people_email: email,
          people_status: 1,
          display_name: displayName || username
        });
        
        // Create token
        const token = jwt.sign(
          { id: user.ID, username: user.people_login },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
    
        // Remove password from response
        const { people_pass, ...userWithoutPassword } = user;
        
        // Respond with token and user data
        res.status(201).json({ 
          token, 
          user: userWithoutPassword 
        });
      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
          error: 'Registration failed',
          details: error.message 
        });
      }
    });
    
    // 3. Modify the login endpoint to properly compare hashed passwords
    // Replace the existing /auth/login route with this:
    app.post('/api/auth/login', async (req, res) => {
      try {
        // Log the incoming request
        console.log('Received login request:', req.body);
    
        const { username, password } = req.body;
    
        // Input validation
        if (!username || !password) {
          console.log('Missing credentials:', { username, password });
          return res.status(400).json({ 
            error: 'Missing credentials',
            details: 'Username and password are required' 
          });
        }
    
        // Find user in the database
        console.log('Searching for user:', username);
        const [user] = await dbo.find('people', { people_login: username });
        
        if (!user) {
          console.log('User not found:', username);
          return res.status(401).json({ 
            error: 'Authentication failed',
            details: 'Invalid username or password' 
          });
        }
    
        // Log the user data (excluding password for security reasons)
        console.log('User found:', { id: user.id, username: user.people_login });
    
        // Compare password with stored hash
        console.log('Comparing passwords...');
        const validPassword = await bcrypt.compare(password, user.people_pass);
    
        if (!validPassword) {
          console.log('Password comparison failed for user:', username);
          return res.status(401).json({ 
            error: 'Authentication failed',
            details: 'Invalid username or password' 
          });
        }
    
        // Log successful password comparison
        console.log('Password valid for user:', username);
    
        // Create token
        console.log('Creating JWT token...');
        const token = jwt.sign(
          { id: user.id, username: user.people_login },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
        
        // Remove password from user data to avoid sending it back in the response
        const { people_pass, ...userWithoutPassword } = user;
    
        // Log token creation
        console.log('JWT token created successfully for user:', username);
    
        // Respond with token and user data
        res.json({ 
          token, 
          user: userWithoutPassword 
        });
    
      } catch (error) {
        // Verbose error handling
        console.error('Login error occurred at:', new Date().toISOString());
        console.error('Request Body:', JSON.stringify(req.body, null, 2));
        console.error('Error Message:', error.message);
        console.error('Error Stack Trace:', error.stack);
        console.error('Error Details:', error);
    
        // Respond with detailed error message to client
        res.status(500).json({ 
          error: 'Login failed',
          details: error.message,
          stack: error.stack // Optional, only in development mode for detailed troubleshooting
        });
      }
    });
    
    // Protected Content Routes
    app.post('/api/content/:tableName', authMiddleware, async (req, res) => {
      try {
        const result = await contentService.createContent(req.params.tableName, req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    app.get('/api/content/:tableName', authMiddleware, async (req, res) => {
      try {
        const result = await contentService.getContent(
          req.params.tableName,
          req.query.conditions ? JSON.parse(req.query.conditions) : {},
          req.query.options ? JSON.parse(req.query.options) : {}
        );
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    
    app.put('/api/content/:tableName/:rowId/field/:columnName/:rowIdColumnName?', authMiddleware, async (req, res) => {
      try {
        const { tableName, rowId, columnName, rowIdColumnName } = req.params;
        const { value } = req.body;
    
        if (!value) {
          return res.status(400).json({ error: 'New value is required' });
        }
    
        // If rowIdColumnName exists, use that, otherwise default to 'id'
        const idColumn = rowIdColumnName || 'id';
    
        const result = await contentService.updateContent(
          tableName,
          { [columnName]: value },
          { [idColumn]: rowId } // Use the dynamic column name
        );
    
        if (!result || result.length === 0) {
          return res.status(404).json({ error: 'Record not found' });
        }
    
        res.json(result[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    app.put('/api/content/:tableName', authMiddleware, async (req, res) => {
      try {
        const result = await contentService.updateContent(
          req.params.tableName,
          req.body.data,
          req.body.conditions
        );
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    app.delete('/api/content/:tableName/:rowId?/:rowIdColumnName?', authMiddleware, async (req, res) => {
      try {
        const { tableName, rowId, rowIdColumnName } = req.params;
        
        // If we have a specific rowId, use that for deletion
        if (rowId) {
          const idColumn = rowIdColumnName || 'id';
          const result = await contentService.deleteContent(
            tableName,
            { [idColumn]: rowId }
          );
          
          if (!result || result.affectedRows === 0) {
            return res.status(404).json({ error: 'Record not found' });
          }
        } else {
          // Fall back to using query conditions if no specific rowId
          const conditions = req.query.conditions ? JSON.parse(req.query.conditions) : {};
          const result = await contentService.deleteContent(tableName, conditions);
          
          if (!result || result.affectedRows === 0) {
            return res.status(404).json({ error: 'No matching records found' });
          }
        }
        
        res.json({ message: 'Record(s) deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    app.delete('/api/content/:tableName', authMiddleware, async (req, res) => {
      try {
        const result = await contentService.deleteContent(
          req.params.tableName,
          req.query.conditions ? JSON.parse(req.query.conditions) : {}
        );
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    // Configure multer for file uploads
    const storage = multer.diskStorage({
      destination: async (req, file, cb) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        // Create year/month/day directory structure
        const uploadPath = path.join('../../uploads', String(year), month, day);
        
        try {
          await fs.mkdir(uploadPath, { recursive: true });
          cb(null, uploadPath);
        } catch (error) {
          cb(error);
        }
      },
      filename: (req, file, cb) => {
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
    });
    
    const upload = multer({ storage: storage });

    // Add this to your existing server routes
    app.post('/api/uploads', authMiddleware, upload.single('file'), async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
    
        // Create a new post record for the uploaded file
        const fileUrl = req.file.path.replace(/\\/g, '/'); // Convert Windows path separators if needed
        
        const postData = {
          post_author: 0,
          post_date: new Date().toISOString(),
          post_date_gmt: new Date().toISOString(),
          post_title: req.body.title || req.file.originalname,
          post_status: 'publish',
          post_name: req.file.filename,
          guid: fileUrl,
          post_type: 'attachment',
          post_mime_type: req.file.mimetype,
          post_content: req.body.description || '',
          comment_status: 'closed',
          ping_status: 'closed',
          post_modified: new Date().toISOString(),
          post_modified_gmt: new Date().toISOString(),
        };
    
        // Use the existing content service to create the post
        const post = await contentService.createContent('posts', postData);
    
        // Add post meta for the file
        const metaData = {
          post_id: post.id, // This will help you confirm if post.ID exists
          meta_key: '_wp_attached_file',
          meta_value: fileUrl
        };
        
        await contentService.createContent('postmeta', metaData);
    
        res.status(201).json({
          message: 'File uploaded successfully',
          file: req.file,
          post: post
        });
      } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
          error: 'Upload failed',
          details: error.message 
        });
      }
    });
    
    // Endpoint to create a new table
    app.post('/api/structure/:tableName', authMiddleware, async (req, res) => {
      try {
        const { tableName } = req.params;
    
        // Define default columns for the table
        const defaultColumns = { id: 'BIGSERIAL PRIMARY KEY' };
    
        // Create the table with default columns
        await dbo.createTable(tableName, defaultColumns);
    
        res.status(201).json({ message: `Table "${tableName}" created successfully with default columns.` });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    // Endpoint to delete an existing table
    app.delete('/api/structure/:tableName', authMiddleware, async (req, res) => {
      try {
        const { tableName } = req.params;
        if (!tableName) {
          return res.status(400).json({ error: 'Table name is required' });
        }
        await dbo.deleteTable(tableName);
        res.status(200).json({ message: `Table "${tableName}" deleted successfully.` });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    // Structure Routes
    app.get('/api/structure/tables', authMiddleware, async (req, res) => {
      try {
        // Query to get all tables in the public schema along with their row counts
        const query = `
              SELECT 
          t.tablename AS name,
          s.n_live_tup AS "rowCount"
        FROM
          pg_catalog.pg_tables t
        JOIN
          pg_stat_user_tables s ON s.relname = t.tablename
        WHERE
          t.schemaname = 'public'
        ORDER BY
          t.tablename;
        `;
        
        const tables = await dbo.execute(query);
        res.json(tables);
      } catch (error) {
        console.error('Error fetching tables:', error);
        res.status(500).json({ 
          error: 'Failed to fetch tables',
          details: error.message 
        });
      }
    });
    
    app.get('/api/structure/:tableName', authMiddleware, async (req, res) => {
      try {
        const { tableName } = req.params;
        const query = `
          SELECT 
            column_name AS name,
            data_type AS raw_type,
            character_maximum_length AS max_length,
            is_nullable = 'YES' AS nullable,
            CASE
              WHEN column_default LIKE 'nextval%' THEN 'auto'
              WHEN data_type = 'character varying' AND column_default LIKE '''%' THEN 
                substring(column_default FROM '''(.*)''')
              ELSE column_default
            END AS "default"
          FROM information_schema.columns 
          WHERE table_name = $1
          ORDER BY ordinal_position
        `;
    
        const rawColumns = await dbo.execute(query, [tableName]);
        
        // Format the columns with proper types
        const columns = rawColumns.map(col => ({
          ...col,
          type: formatColumnType(col.raw_type, col.max_length),
          // Remove the raw_type field from final output
          raw_type: undefined,
          max_length: undefined
        }));
    
        res.json({ columns });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    // Helper function to format column types
    function formatColumnType(rawType, maxLength) {
      switch (rawType) {
        case 'character varying':
          return maxLength ? `varchar(${maxLength})` : 'varchar';
        case 'character':
          return maxLength ? `char(${maxLength})` : 'char';
        case 'integer':
          return 'integer';
        case 'bigint':
          return 'bigint';
        case 'text':
          return 'text';
        case 'boolean':
          return 'boolean';
        case 'timestamp without time zone':
          return 'timestamp';
        case 'timestamp with time zone':
          return 'timestamptz';
        case 'json':
          return 'json';
        case 'jsonb':
          return 'jsonb';
        // Add more type mappings as needed
        default:
          return rawType;
      }
    }
    
    // Endpoint to add a new column to an existing table
    app.post('/api/structure/:tableName/columns', authMiddleware, async (req, res) => {
      try {
        const { tableName } = req.params;
        const { columnName, columnType } = req.body;
    
        if (!columnName || !columnType) {
          return res.status(400).json({ error: 'Column name and type are required' });
        }
    
        await dbo.addColumn(tableName, columnName, columnType);
        res.status(201).json({ message: `Column "${columnName}" added to table "${tableName}" successfully.` });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    // Endpoint to update an existing table column
    app.put('/api/structure/:tableName/columns/:columnName/:newColumnName?', authMiddleware, async (req, res) => {
      const { tableName, columnName, newColumnName } = req.params;
      const { type, nullable, default: defaultValue } = req.body;
    
      try {
        console.log(`[INFO] Received request to update column "${columnName}" in table "${tableName}"`);
    
        // Validate request body
        if (!type) {
          console.error('[ERROR] Column type is required in the request body.');
          return res.status(400).json({ error: 'Column type is required' });
        }
    
        // Log request details
        console.log(`[INFO] Request details:`, {
          tableName,
          columnName,
          newColumnName,
          type,
          nullable,
          defaultValue,
        });
    
        // Rename column if `newColumnName` is provided and differs from the current name
        if (newColumnName && newColumnName !== columnName) {
          console.log(`[INFO] Renaming column "${columnName}" to "${newColumnName}"`);
          const renameQuery = `
            ALTER TABLE ${tableName}
            RENAME COLUMN ${columnName} TO ${newColumnName};
          `;
          console.log(`[DEBUG] Rename Query: ${renameQuery}`);
          await dbo.execute(renameQuery);
        }
        
        // Change the data type of the column
        const alterTypeQuery = `
          ALTER TABLE ${tableName}
          ALTER COLUMN ${newColumnName || columnName}
          SET DATA TYPE ${type};
        `;
        console.log(`[INFO] Altering data type of column "${newColumnName || columnName}" to "${type}"`);
        console.log(`[DEBUG] Alter Type Query: ${alterTypeQuery}`);
        await dbo.execute(alterTypeQuery);
        
        // Update nullable constraint (SET NOT NULL or DROP NOT NULL)
        const alterNullableQuery = `
          ALTER TABLE ${tableName}
          ALTER COLUMN ${newColumnName || columnName}
          ${nullable ? 'DROP NOT NULL' : 'SET NOT NULL'};
        `;
        console.log(
          `[INFO] Updating nullable constraint of column "${newColumnName || columnName}" to ${
            nullable ? 'DROP NOT NULL' : 'SET NOT NULL'
          }`
        );
        console.log(`[DEBUG] Alter Nullable Query: ${alterNullableQuery}`);
        await dbo.execute(alterNullableQuery);
        
        // Check if the column is a serial type (integer with a sequence)
        const columnQuery = `
          SELECT column_name, data_type, column_default
          FROM information_schema.columns
          WHERE table_name = '${tableName}' AND column_name = '${newColumnName || columnName}';
        `;
        
        console.log(`[DEBUG] Executing query to check column info for table "${tableName}", column "${newColumnName || columnName}"`);
        
        const columnResult = await dbo.execute(columnQuery);  // Only passing the query, no second argument
        
        console.log(`[DEBUG] columnResult:`, columnResult);
            
        const column = columnResult[0];
            
        // Ensure the column exists before proceeding
        if (!column) {
          console.error(`[ERROR] Column "${newColumnName || columnName}" not found in table "${tableName}"`);
          return res.status(404).json({ error: `Column "${newColumnName || columnName}" not found` });
        }
        
        console.log(`[DEBUG] Column details:`, column);
        
        // Check if it's a serial type (integer with a sequence default)
        const isSerial = (column.data_type === 'integer' || column.data_type === 'bigint') 
                         && column.column_default && column.column_default.includes('nextval');
        
        console.log(`[DEBUG] Is serial: ${isSerial}`);
        
        // Skip updating the default value for serial columns
        if (!isSerial && defaultValue !== undefined && defaultValue !== null) {
          // Update the default value (SET DEFAULT or DROP DEFAULT)
          let alterDefaultQuery;
          if (defaultValue !== undefined && defaultValue !== null) {
            alterDefaultQuery = `
              ALTER TABLE ${tableName}
              ALTER COLUMN ${newColumnName || columnName}
              SET DEFAULT '${defaultValue}';
            `;
            console.log(
              `[INFO] Setting default value of column "${newColumnName || columnName}" to "${defaultValue}"`
            );
          } else {
            alterDefaultQuery = `
              ALTER TABLE ${tableName}
              ALTER COLUMN ${newColumnName || columnName}
              DROP DEFAULT;
            `;
            console.log(`[INFO] Dropping default value of column "${newColumnName || columnName}"`);
          }
          console.log(`[DEBUG] Alter Default Query: ${alterDefaultQuery}`);
          await dbo.execute(alterDefaultQuery);
        } else {
          console.log(`[INFO] Skipping default value update for serial column "${newColumnName || columnName}"`);
        }
    
        console.log(
          `[SUCCESS] Column "${newColumnName || columnName}" in table "${tableName}" updated successfully.`
        );
        res.status(200).json({
          message: `Column "${newColumnName || columnName}" in table "${tableName}" updated successfully.`,
        });
      } catch (error) {
        console.error(`[ERROR] Failed to update column "${columnName}" in table "${tableName}":`, error.message);
        res.status(500).json({ error: error.message });
      }
    });
    
    // Endpoint to drop a column from an existing table
    app.delete('/api/structure/:tableName/columns/:columnName', authMiddleware, async (req, res) => {
      try {
        const { tableName, columnName } = req.params;
    
        if (!columnName) {
          return res.status(400).json({ error: 'Column name is required' });
        }
    
        await dbo.dropColumn(tableName, columnName);
        res.status(200).json({ message: `Column "${columnName}" dropped from table "${tableName}" successfully.` });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    // Content Preview Routes for Drawer
    app.get('/api/preview/pages', authMiddleware, async (req, res) => {
      try {
        const pages = await dbo.find('posts', 
          { post_type: 'page' }, 
          { limit: 10, orderBy: 'post_date DESC' }
        );
        res.json(pages);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    app.get('/api/preview/posts', authMiddleware, async (req, res) => {
      try {
        const posts = await dbo.find('posts', 
          { post_type: 'post' }, 
          { limit: 10, orderBy: 'post_date DESC' }
        );
        res.json(posts);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    app.get('/api/preview/links', authMiddleware, async (req, res) => {
      try {
        const links = await dbo.find('links', 
          {}, 
          { limit: 10, orderBy: 'link_id DESC' }
        );
        res.json(links);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    app.get('/api/preview/options', authMiddleware, async (req, res) => {
      try {
        const options = await dbo.find('options', 
          {}, 
          { limit: 10, orderBy: 'option_id DESC' }
        );
        res.json(options);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    app.get('/api/posts/:postType?', async (req, res) => {
      try {
        // Get postType from route params, default to 'post' if not provided
        const postType = req.params.postType || 'post';
        
        const query = 'SELECT * FROM posts WHERE post_type = $1';
        const posts = await dbo.execute(query, [postType]);
        res.status(200).json({
          status: 'OK',
          posts,
        });
      } catch (error) {
        console.error('Error fetching dashboard links:', error);
        res.status(500).json({
          error: 'Failed to fetch dashboard links',
          details: error.message,
        });
      }
    });

    // Route for fetching all terms
    app.get('/api/terms', async (req, res) => {
      try {
        const query = 'SELECT * FROM terms';
        const terms = await dbo.execute(query);
        res.status(200).json({
          status: 'OK',
          terms,
        });
      } catch (error) {
        console.error('Error fetching terms:', error);
        res.status(500).json({
          error: 'Failed to fetch terms',
          details: error.message,
        });
      }
    });
    
    // Route for fetching all taxonomies
    app.get('/api/taxonomy', async (req, res) => {
      try {
        const query = 'SELECT * FROM termtaxonomy';
        const taxonomies = await dbo.execute(query);
        res.status(200).json({
          status: 'OK',
          taxonomies,
        });
      } catch (error) {
        console.error('Error fetching taxonomies:', error);
        res.status(500).json({
          error: 'Failed to fetch taxonomies',
          details: error.message,
        });
      }
    });
    
    // 1. First, let's add the new backend route
    app.get('/api/termrelationships', async (req, res) => {
      try {
        const query = `
          SELECT tr.object_id, tr.term_taxonomy_id, tt.taxonomy, tt.term_id, t.name as term_name, p.post_title, p.post_type, p.post_content
          FROM termrelationships tr
          JOIN termtaxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
          JOIN terms t ON tt.term_id = t.term_id
          JOIN posts p ON tr.object_id = p.id
          ORDER BY tt.taxonomy, t.name, p.post_title
        `;
        const relationships = await dbo.execute(query);
        res.status(200).json({
          status: 'OK',
          relationships,
        });
      } catch (error) {
        console.error('Error fetching term relationships:', error);
        res.status(500).json({
          error: 'Failed to fetch term relationships',
          details: error.message,
        });
      }
    });
    
    app.get('/api/links/footer', async (req, res) => {
      try {
        const query = 'SELECT * FROM links WHERE link_rel = $1';
        const links = await dbo.execute(query, ['footer']);
        res.status(200).json({
          status: 'OK',
          links,
        });
      } catch (error) {
        console.error('Error fetching dashboard links:', error);
        res.status(500).json({
          error: 'Failed to fetch dashboard links',
          details: error.message,
        });
      }
    });
    
    app.get('/api/links/mobile', async (req, res) => {
      try {
        const query = 'SELECT * FROM links WHERE link_rel = $1';
        const links = await dbo.execute(query, ['mobile']);
        res.status(200).json({
          status: 'OK',
          links,
        });
      } catch (error) {
        console.error('Error fetching mobile links:', error);
        res.status(500).json({
          error: 'Failed to fetch mobile links',
          details: error.message,
        });
      }
    });
    
    app.get('/api/links/dashboard', async (req, res) => {
      try {
        const query = 'SELECT * FROM links WHERE link_rel = $1';
        const links = await dbo.execute(query, ['dashboard']);
        res.status(200).json({
          status: 'OK',
          links,
        });
      } catch (error) {
        console.error('Error fetching dashboard links:', error);
        res.status(500).json({
          error: 'Failed to fetch dashboard links',
          details: error.message,
        });
      }
    });
    
    let lastTraceId = null; // To keep track of the last trace ID
    
    // Store provider at module level
    let provider = null;
    
    const createTracer = (serviceName) => {
      // Create a new resource with the service name
      const resource = new Resource({
        [SEMRESATTRS_SERVICE_NAME]: serviceName,
      });
    
      // If provider exists, force unregister
      if (provider) {
        opentelemetry.trace.disable();
      }
    
      // Create new provider with the new resource
      provider = new BasicTracerProvider({
        resource: resource,
      });
    
      const exporter = new JaegerExporter({
        endpoint: 'http://localhost:14268/api/traces',
      });
    
      provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
      provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    
      // Register the provider with force flag
      provider.register({
        forceFlush: true,
      });
    
      // Create a new tracer instance with unique name including service name
      return provider.getTracer(`example-basic-tracer-node-${serviceName}`);
    };

    // Define the app.get route
    app.get('/api/span/:page?', async (req, res) => {
      let { page } = req.params;
    
      // If page is empty, set it to "Home"
      if (!page) {
        page = 'Home';
      }
    
      // Initialize tracer with the page name as the service name
      const tracer = createTracer(page);
    
      // Dynamically name the span and start it
      const spanName = `/GET ${page}`;
      const span = tracer.startSpan(spanName);
    
      // Set the 'from' attribute using the last trace ID (if it exists)
      if (lastTraceId) {
        span.setAttribute('from', lastTraceId);
      }
    
      // Set 'to' attribute with the current trace ID
      const currentTraceId = span.spanContext().traceId;
      span.setAttribute('to', currentTraceId);
    
      try {
        // Send response
        res.send(`Trace for page: ${page} with trace ID: ${currentTraceId}`);
      } catch (error) {
        span.recordException(error);
        res.status(500).send('Span Push Error');
      } finally {
        // Update lastTraceId to the current trace ID for the next span
        lastTraceId = currentTraceId;
    
        // Ensure span ends
        span.end();
    
        // Force flush to ensure spans are exported
        await provider.forceFlush();
      }
    });

    const BASE_URL = 'http://localhost:16686/api';
    
    // Function to get all service names
    async function getServiceNames() {
      const response = await axios.get(`${BASE_URL}/services`);
      return response.data.data;
    }
    
    // Function to get trace data for a given service
    async function getTraceData(serviceName) {
      const response = await axios.get(`${BASE_URL}/traces?service=${serviceName}`);
      return response.data.data;
    }
    
    // Function to build trace hierarchy with complete trace data
    async function buildTraceHierarchy() {
      const services = await getServiceNames();
      const masterList = {};
    
      // Step 1: Gather all trace data across services
      for (const service of services) {
        const traces = await getTraceData(service);
    
        traces.forEach(trace => {
          const traceID = trace.traceID;
          if (!masterList[traceID]) {
            masterList[traceID] = {
              serviceName: service,
              to: [],
              from: []
            };
          }
    
          trace.spans.forEach(span => {
            const { traceID: spanTraceID, tags } = span;
    
            tags.forEach(tag => {
              // Check for 'to' tags and populate to array
              if (tag.key === 'to') {
                if (!masterList[traceID].to.includes(tag.value)) {
                  masterList[traceID].to.push(tag.value);
                }
              }
              // Check for 'from' tags and populate from array
              if (tag.key === 'from') {
                if (!masterList[traceID].from.includes(tag.value)) {
                  masterList[traceID].from.push(tag.value);
                }
              }
            });
          });
        });
      }
    
      // Step 2: Format the masterList for output
      return Object.keys(masterList).map(traceID => ({
        traceID,
        serviceName: masterList[traceID].serviceName,
        to: masterList[traceID].to,
        from: masterList[traceID].from
      }));
    }

    // Route to handle /spans and return the organized trace data
    app.get('/api/spans', async (req, res) => {
      try {
        const hierarchy = await buildTraceHierarchy();
        res.status(200).json(hierarchy);
      } catch (error) {
        console.error('Error in /spans route:', error);
        res.status(500).json({ message: 'Error handling /spans route' });
      }
    });
    
    // Create and start the server
    const server = http.createServer(app);
    
    server.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit the process if the server fails to start
  }
};

    // Define the shutdown function first
    const shutdown = async (dbo) => {
      try {
        console.log("Shutting down the server...");
        await dbo.shutdown(); // Close DB connections
        server.close(() => {
          console.log("Server closed gracefully.");
          process.exit(0); // Exit the process successfully
        });
      } catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1); // Exit the process with an error code
      }
    };
    
    // Set up the signal listeners for graceful shutdown
    process.on('SIGINT', () => shutdown(dbo));
    process.on('SIGTERM', () => shutdown(dbo));
    
    // Start the server after the shutdown handlers are set up
    startServer();