const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// SSL options for HTTPS
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, '..', process.env.SSL_KEY_FILE)),
  cert: fs.readFileSync(path.join(__dirname, '..', process.env.SSL_CRT_FILE)),
};

// Redirect HTTP to HTTPS for .io domains only
app.use((req, res, next) => {
  const host = req.headers['host'];
  const tld = host.split('.').pop(); // Get the TLD from the host (e.g., 'example.io' -> 'io')

  if (!req.secure && tld === 'io' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${host}${req.url}`);
  }
  next();
});

const forwardRequest = (req, res) => {
  console.log(`Incoming request URL: ${req.url}`);

  // Extract the dynamic part of the route
  const npxRoute = req.params[0]; // Extract dynamic route after '/npx/'
  console.log(`Dynamic NPX Route: ${npxRoute}`);

  if (!npxRoute) {
    console.error('No dynamic route found after /npx/');
    return res.status(400).json({ error: 'Bad Request: No dynamic route found' });
  }

  // Prepare request options
  const requestOptions = {
    hostname: 'localhost',
    port: 3000,
    path: `/npx/${npxRoute}`,
    method: req.method,
    headers: { ...req.headers },
  };

  // If POST, set content headers and stringify the body
  let jsonPayload = null;
  if (req.method === 'POST') {
    jsonPayload = JSON.stringify(req.body);
    requestOptions.headers['Content-Type'] = 'application/json';
    requestOptions.headers['Content-Length'] = Buffer.byteLength(jsonPayload);
  }

  // Forward the request using http
  const proxyReq = http.request(requestOptions, (proxyRes) => {
    if (req.method === 'POST') {
      // POST-specific logic
      let data = '';

      // Collect data chunks
      proxyRes.on('data', (chunk) => {
        data += chunk;
      });

      // Handle response completion
      proxyRes.on('end', () => {
        console.log(`Forwarded response: ${data}`);
        res.status(proxyRes.statusCode).send(data); // Send the backend's response to the client
      });
    } else {
      // For other methods, pipe the response stream directly
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    }
  });

  // Handle request errors
  proxyReq.on('error', (error) => {
    console.error(`Error forwarding request: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  // If POST, write the JSON payload
  if (jsonPayload) {
    proxyReq.write(jsonPayload);
  }

  proxyReq.end();
};

// Handle /npx/* route forwarding
app.use('/npx/*', (req, res) => {
  console.log(`Handling ${req.method} request to /npx/*`);
  forwardRequest(req, res);
});

const forwardRequestSpans = (req, res) => {
  console.log(`Incoming request URL: ${req.url}`);

  // Extract the dynamic part of the route
  const apiRoute = req.params[0]; // Extract dynamic route after '/api/'
  console.log(`Dynamic API Route: ${apiRoute}`);

  if (!apiRoute) {
    console.error('No dynamic route found after /api/');
    return res.status(400).json({ error: 'Bad Request: No dynamic route found' });
  }

  // Prepare request options
  const requestOptions = {
    hostname: 'localhost',
    port: 3000,
    path: `/api/${apiRoute}`,
    method: req.method,
    headers: { ...req.headers },
  };

  // Forward the request using http
  const proxyReq = http.request(requestOptions, (proxyRes) => {
    // For GET method, pipe the response stream directly
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  // Handle request errors
  proxyReq.on('error', (error) => {
    console.error(`Error forwarding request: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  proxyReq.end();
};

// Handle /api/* route forwarding for GET requests
app.use('/api/*', (req, res) => {
  console.log(`Handling ${req.method} request to /api/*`);
  if (req.method === 'GET') {
    forwardRequestSpans(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed: Only GET is supported' });
  }
});

// Serve React build for other routes
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// Start the HTTPS server
const httpsServer = https.createServer(sslOptions, app);
httpsServer.listen(443, '0.0.0.0', () => {
  console.log(`HTTPS Server running on https://0.0.0.0:443`);
});

// Start the HTTP server (no SSL)
const httpServer = http.createServer(app);
httpServer.listen(80, '0.0.0.0', () => {
  console.log(`HTTP Server running on http://0.0.0.0:80`);
});

