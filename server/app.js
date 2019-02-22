const path = require('path')
const Koa = require('koa')
const koaLogger = require('koa-logger')
const views = require('koa-views')
const koaStatic = require('koa-static')
const config = require('./../config')
const routers = require('./routers/index')
const bodyParser = require('koa-bodyparser');

const app = new Koa()

// 配置控制台日志中间件
app.use(koaLogger())
// 配置服务端模板渲染引擎中间件
// const isProduction = process.env.NODE_ENV === 'production'
// app.use(templating('views', {
// 	noCache: !isProduction,
// 	watch: !isProduction
// }))

// 配置静态资源加载中间件
app.use(koaStatic(
	path.join(__dirname, './../build')
))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
	extension: 'ejs'
}))

//处理post请求 将form json解析
app.use(bodyParser())

// 初始化路由中间件和对于的allowedMethods
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)
