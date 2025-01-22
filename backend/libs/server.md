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
          const placeholders = value.map((_, i) => `$${values.length + i + 1}`).join(', ');
          whereClauses.push(`${key} IN (${placeholders})`);
          values.push(...value);
        } else {
          whereClauses.push(`${key} = $${values.length + 1}`);
          values.push(value);
        }
      });
    
      const whereClause = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';
      const joinClause = options.joins || ''; // Add support for joins
      const orderByClause = options.orderBy ? `ORDER BY ${options.orderBy}` : '';
      const limitClause = options.limit ? `LIMIT ${options.limit}` : '';
      const offsetClause = options.offset ? `OFFSET ${options.offset}` : '';
    
      const query = `
        SELECT * FROM ${tableName}
        ${joinClause}
        ${whereClause}
        ${orderByClause}
        ${limitClause}
        ${offsetClause}
      `;
      console.log("Dbopostgresql find() query: " + query);
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
      
async findAll(tableName, conditions = {}, options = {}) {
  const whereConditions = [];
  const values = [];
  let paramCount = 1;

  // Handle `$or` conditions
  if (conditions.$or) {
    const orClauses = conditions.$or.map((clause) => {
      const [field, value] = Object.entries(clause)[0];
      values.push(value);
      return `LOWER(${field}) LIKE LOWER($${paramCount++})`; // Use `LIKE` with `LOWER`
    });
    whereConditions.push(`(${orClauses.join(' OR ')})`);
  } else {
    // Handle regular conditions
    Object.entries(conditions).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const placeholders = value.map(() => `$${paramCount++}`).join(', ');
        whereConditions.push(`${key} IN (${placeholders})`);
        values.push(...value);
      } else {
        values.push(value);
        whereConditions.push(`${key} = $${paramCount++}`);
      }
    });
  }

  // Build SQL clauses
  const whereClause = whereConditions.length ? `WHERE ${whereConditions.join(' AND ')}` : '';
  const orderByClause = options.orderBy ? `ORDER BY ${options.orderBy}` : '';
  const limitClause = options.limit ? `LIMIT ${options.limit}` : '';

  // Final query
  const query = `
    SELECT * FROM ${tableName}
    ${whereClause}
    ${orderByClause}
    ${limitClause}
  `;

  console.log("DboPostgresql findAll() query:", query, "values:", values);

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

// Initialize.js - Handles dependency injection
class Initialize {
  static dbo = null;
  static contentService = null;

  static init(dbo, contentService) {
    Initialize.dbo = dbo;
    Initialize.contentService = contentService;
  }

  static getDbo() {
    if (!Initialize.dbo) {
      throw new Error('Database not initialized');
    }
    return Initialize.dbo;
  }

  static getContentService() {
    if (!Initialize.contentService) {
      throw new Error('Content service not initialized');
    }
    return Initialize.contentService;
  }
}

// BaseModel.js
class BaseModel {
  constructor() {
    this.tableName = '';
    this.publicFields = [];
    this.searchableFields = [];
    this.joinTables = [];
  }
  
  getSelectFields() {
    if (!Array.isArray(this.publicFields) || this.publicFields.length === 0) {
      return '*';
    }
    return this.publicFields.map(field => `${this.tableName}.${field}`).join(', ');
  }
  
  filterFields(data) {
    if (!Array.isArray(this.publicFields) || this.publicFields.length === 0) {
      return data;
    }
    return Array.isArray(data) ? data.map(item => this.filterSingleItem(item)) : this.filterSingleItem(data);
  }

  filterSingleItem(item) {
    if (!item) return item;
    return this.publicFields.reduce((filtered, field) => {
      if (item.hasOwnProperty(field)) {
        filtered[field] = item[field];
      }
      return filtered;
    }, {});
  }
}

// models/PostModel.js
class PostModel extends BaseModel {
  constructor() {
    super();
    this.tableName = 'posts';
    this.publicFields = [
      'id',
      'post_title',
      'post_content',
      'post_type',
      'post_status',
      'post_date',
      'post_modified',
      'post_author',
      'post_name',
      'post_excerpt',
      'post_mime_type'
    ];
    this.searchableFields = ['post_title', 'post_content'];
  }
}

// models/LinkModel.js
class LinkModel extends BaseModel {
  constructor() {
    super();
    this.tableName = 'links';
    this.publicFields = [
      'link_id',
      'link_url',
      'link_name',
      'link_image',
      'link_target',
      'link_description',
      'link_visible',
      'link_owner',
      'link_rating',
      'link_updated',
      'link_rel',
      'link_notes',
      'link_rss'
    ];
  }
}

// models/TermModel.js
class TermModel extends BaseModel {
  constructor() {
    super();
    this.tableName = 'terms';
    this.publicFields = [
      'term_id',
      'name',
      'slug',
      'term_group'
    ];
    this.searchableFields = ['name', 'slug'];
    this.joinTables = [
      { 
        table: 'termtaxonomy',
        condition: 'terms.term_id = termtaxonomy.term_id'
      }
    ];
  }
}

// models/TaxonomyModel.js
class TaxonomyModel extends BaseModel {
  constructor() {
    super();
    this.tableName = 'termtaxonomy';
    this.publicFields = [
      'term_taxonomy_id',
      'term_id',
      'taxonomy',
      'description',
      'parent',
      'count'
    ];
  }
}

// models/StructureModel.js
class StructureModel extends BaseModel {
  constructor() {
    super();
    this.tableName = 'information_schema.columns';
    this.publicFields = [
      'table_name',
      'column_name',
      'data_type',
      'character_maximum_length',
      'is_nullable',
      'column_default'
    ];
  }
}

// BaseController.js
class BaseController {
  constructor() {
    this.dbo = Initialize.getDbo();
    this.contentService = Initialize.getContentService();
    this.model = null;
    this.tableName = '';
  }

  setModel(ModelClass) {
    this.model = new ModelClass();
    this.tableName = this.model.tableName;
  }

  async create(data) {
    const result = await this.contentService.createContent(this.tableName, data);
    return this.model.filterFields(result);
  }

  async read(conditions = {}, options = {}) {
    const result = await this.contentService.getContent(this.tableName, conditions, options);
    return this.model.filterFields(result);
  }

  async update(data, conditions) {
    const result = await this.contentService.updateContent(this.tableName, data, conditions);
    return this.model.filterFields(result);
  }

  async delete(conditions) {
    const result = await this.contentService.deleteContent(this.tableName, conditions);
    return this.model.filterFields(result);
  }

  async find(conditions = {}, options = {}) {
    const result = await this.dbo.find(this.tableName, conditions, options);
    return this.model.filterFields(result);
  }

  async findWithJoins(conditions = {}, joinConditions = {}, options = {}) {
    const whereClauses = [];
    const values = [];
    const joinClauses = options.joins || '';

    const baseTableName = this.tableName.split(' ')[0];
    const tableAlias = this.tableName.split(' ')[1] || baseTableName;

    Object.entries(conditions).forEach(([key, value]) => {
      whereClauses.push(`${tableAlias}.${key} = $${values.length + 1}`);
      values.push(value);
    });

    Object.entries(joinConditions).forEach(([key, value]) => {
      whereClauses.push(`${key} = $${values.length + 1}`);
      values.push(value);
    });

    const whereClause = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';
    const selectFields = options.fields ? options.fields.join(', ') : this.model.getSelectFields();

    const query = `
      SELECT ${selectFields}
      FROM ${this.tableName}
      ${joinClauses}
      ${whereClause}
      ${options.orderBy ? `ORDER BY ${options.orderBy}` : ''}
      ${options.limit ? `LIMIT ${options.limit}` : ''}
      ${options.offset ? `OFFSET ${options.offset}` : ''}
    `.trim();

    const result = await this.dbo.execute(query, values);
    return this.model.filterFields(result);
  }
}

// Specific Controllers
class PostController extends BaseController {
  constructor() {
    super();
    this.setModel(PostModel);
  }

  async getByType(postType, options = {}) {
    const result = await this.dbo.find(
      this.tableName,
      { post_type: postType },
      { 
        orderBy: 'post_date DESC',
        ...options
      }
    );
    return this.model.filterFields(result);
  }

  async getPublished(postType, options = {}) {
    const result = await this.dbo.find(
      this.tableName,
      { 
        post_type: postType,
        post_status: 'publish'
      },
      {
        orderBy: 'post_date DESC',
        ...options
      }
    );
    return this.model.filterFields(result);
  }

  async searchPosts(searchTerm) {
    const result = await this.dbo.find(
      this.tableName,
      {
        $or: [
          { post_title: { $ilike: `%${searchTerm}%` } },
          { post_content: { $ilike: `%${searchTerm}%` } }
        ]
      },
      { orderBy: 'post_date DESC' }
    );
    return this.model.filterFields(result);
  }
}

class LinkController extends BaseController {
  constructor() {
    super();
    this.setModel(LinkModel);
  }

  async getByRel(rel) {
    const result = await this.dbo.find(this.tableName, { link_rel: rel });
    return this.model.filterFields(result);
  }

  async searchLinks(searchTerm) {
    const searchPattern = `%${searchTerm}%`;
    const result = await this.dbo.findAll(
      this.tableName,
      {
        $or: [
          { link_name: searchPattern },
          { link_target: searchPattern }
        ]
      },
      {
        orderBy: 'link_id',
        limit: 1
      }
    );
    return this.model.filterFields(result);
  }
}

class TermController extends BaseController {
  constructor() {
    super();
    this.setModel(TermModel);
  }

  async getTermsWithTaxonomy() {
    const result = await this.findWithJoins(
      {},
      {},
      { orderBy: 'terms.name' }
    );
    return this.model.filterFields(result);
  }

  async getTermRelationships() {
    this.tableName = 'termrelationships tr';
    const result = await this.findWithJoins(
      {},
      {},
      {
        fields: [
          'tr.object_id',
          'tr.term_taxonomy_id',
          'tt.taxonomy',
          't.term_id',
          't.name as term_name',
          'p.post_title',
          'p.post_type',
          'p.post_content'
        ],
        joins: `
          JOIN termtaxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
          JOIN terms t ON tt.term_id = t.term_id
          JOIN posts p ON tr.object_id = p.id
        `,
        orderBy: 'tt.taxonomy, t.name, p.post_title'
      }
    );
    return this.model.filterFields(result);
  }
}

class TaxonomyController extends BaseController {
  constructor() {
    super();
    this.setModel(TaxonomyModel);
  }

  async getAllTaxonomies(options = {}) {
    const result = await this.dbo.find(this.tableName, {}, options);
    return this.model.filterFields(result);
  }

  async getTaxonomyByTerm(termId) {
    const result = await this.dbo.find(
      this.tableName,
      { term_id: termId }
    );
    return this.model.filterFields(result);
  }

  async getTaxonomiesByType(taxonomyType) {
    const result = await this.dbo.find(
      this.tableName,
      { taxonomy: taxonomyType }
    );
    return this.model.filterFields(result);
  }
}

class StructureController extends BaseController {
  constructor() {
    super();
    this.setModel(StructureModel);
  }

  async getTables() {
    const result = await this.dbo.find(
      'pg_catalog.pg_tables',
      { schemaname: 'public' },
      { 
        fields: ['tablename AS name'],
        orderBy: 'tablename'
      }
    );
    return this.model.filterFields(result);
  }

  async getTableColumns(tableName) {
    const result = await this.dbo.find(
      'information_schema.columns',
      { table_name: tableName },
      {
        fields: [
          'column_name AS name',
          'data_type',
          'character_maximum_length',
          'is_nullable',
          'column_default'
        ],
        orderBy: 'ordinal_position'
      }
    );
    return this.model.filterFields(result);
  }

  async getTableInfo(tableName) {
    const result = await this.dbo.find(
      'pg_stat_user_tables',
      { relname: tableName },
      {
        fields: [
          'relname AS name',
          'n_live_tup AS row_count',
          'last_autovacuum',
          'last_analyze'
        ]
      }
    );
    return this.model.filterFields(result);
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
    
    // Initialize the dependency container FIRST
    Initialize.init(dbo, contentService);


// Create models and controllers without passing dependencies
const models = {
  links: new LinkModel(),
  posts: new PostModel(),
  terms: new TermModel(),
  taxonomy: new TaxonomyModel(),
  structure: new StructureModel()
};

const controllers = {
  posts: new PostController(),
  links: new LinkController(),
  terms: new TermController(),
  taxonomy: new TaxonomyController(),
  structure: new StructureController()
};

    app.get('/api/public/:model', async (req, res) => {
      try {
        const { model } = req.params;
        const conditions = req.query.conditions ? JSON.parse(req.query.conditions) : {};
        const options = req.query.options ? JSON.parse(req.query.options) : {};
    
        if (!models[model]) {
          return res.status(404).json({ error: 'Model not found' });
        }
    
        const results = await models[model].findPublic(conditions, options);
        res.json({ status: 'OK', results });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }); //We need findPublic, it is model specific as you can see But we do not use const models for this anymore, so we need to set the model then this method should probably be part of a new CommonController
    
    app.get('/api/public/:model/search/:term', async (req, res) => {
      try {
        const { model, term } = req.params;
        if (!models[model]) {
          return res.status(404).json({ error: 'Model not found' });
        }
    
        const results = await models[model].searchPublic(term);
        res.json({ status: 'OK', results });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }); //We need searchPublic and the same requirements as above apply, A new CommonController sounds good?
    
    
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