const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy for /api route
  app.use(
    '/api/v1',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );
};