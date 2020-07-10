const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1.0.0',
    createProxyMiddleware({
      target: 'http://rap2.taobao.org:38080',
      changeOrigin: true,
    }),
  );
};
