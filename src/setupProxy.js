const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(proxy('/api', {
      target: 'http://192.168.100.143:8040',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    }))
}