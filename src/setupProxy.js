const { createProxyMiddleware } = require('http-proxy-middleware')
/*
//中间件
module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://localhost:4000',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api"
    }
  }))
}
*/
//两个服务器代理
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api1', {    //有api1的后缀就出发这个代理
    target: 'http://localhost:5000',    //代理吧请求转发给5000
    changeOrigin: true,                 //控制服务器获取的请求的的host,为true就是5000，默认false就是3000 可以不写
    pathRewrite: {                      //重写请求路径 （把/api1替换为''）
      "^/api1": ""
    }
  }),
  createProxyMiddleware('/api2', {
    target: 'http://localhost:5001',
    changeOrigin: true,
    pathRewrite: {
      "^/api2": ""
    }
  }),
  )
}