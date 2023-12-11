const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',  // Укажите адрес вашего Django бекенда
      changeOrigin: true,
    })
  );
};