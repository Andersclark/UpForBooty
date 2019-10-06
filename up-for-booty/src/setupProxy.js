const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use('/booty', proxy({
    target: 'http://localhost:5000',
    changeOrigin: true,
  }));
  app.use('/public', proxy({
    target: 'http://localhost:5000/public',
    changeOrigin: true,
  }));
};