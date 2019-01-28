const path = require('path')
const Koa = require('koa')

const config = require('./../config')
const routers = require('./routers/index')

const app = new Koa()

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)
