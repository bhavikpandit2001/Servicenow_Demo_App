//const { createProxyMiddleware } = require('http-proxy-middleware');
import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app) {
  app.use(
    '/api', // Change this to match your ServiceNow API path
    createProxyMiddleware({
      target: 'https://dev145961.service-now.com',
      changeOrigin: true,
    })
  );
};