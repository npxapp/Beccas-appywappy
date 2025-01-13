const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// SSL options for HTTPS
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, '..', process.env.SSL_KEY_FILE)),
  cert: fs.readFileSync(path.join(__dirname, '..', process.env.SSL_CRT_FILE)),
};

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (!req.secure && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

const forwardRequest = (req, res) => {
  console.log(`Incoming request URL: ${req.url}`);

  const npxRoute = req.params[0];
  console.log(`Dynamic NPX Route: ${npxRoute}`);

  if (!npxRoute) {
    console.error('No dynamic route found after /npx/');
    return res.status(400).json({ error: 'Bad Request: No dynamic route found' });
  }

  const parsedUrl = url.parse(req.url);
  const requestOptions = {
    hostname: 'localhost',
    port: 3000,
    path: `/api/${npxRoute}${parsedUrl.search || ''}`, // Include query string
    method: req.method,
    headers: { ...req.headers },
  };

  let jsonPayload = null;
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    jsonPayload = JSON.stringify(req.body);
    requestOptions.headers['Content-Type'] = 'application/json';
    requestOptions.headers['Content-Length'] = Buffer.byteLength(jsonPayload);
  }

  const proxyReq = http.request(requestOptions, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (error) => {
    console.error(`Error forwarding request: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  if (jsonPayload) {
    proxyReq.write(jsonPayload);
  }

  proxyReq.end();
};

// Handle /api/* route forwarding
app.use('/api/*', (req, res) => {
  console.log(`Handling ${req.method} request to /npx/*`);
  forwardRequest(req, res);
});

// Serve React build for other routes
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// Start the server with HTTPS
const server = https.createServer(sslOptions, app);
server.listen(443, '0.0.0.0', () => {
  console.log(`Server running on https://0.0.0.0:443`);
});