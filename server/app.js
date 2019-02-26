const path = require('path')
const Koa = require('koa')
const koaLogger = require('koa-logger')
const views = require('koa-views')
const koaStatic = require('koa-static')
const config = require('./../config')
const routers = require('./routers/index')
const bodyParser = require('koa-bodyparser');
const koajwt = require('koa-jwt');
const codes = require('./codes/users.js');

const app = new Koa()

// 配置控制台日志中间件
app.use(koaLogger())
// 配置服务端模板渲染引擎中间件
// const isProduction = process.env.NODE_ENV === 'production'
// app.use(templating('views', {
// 	noCache: !isProduction,
// 	watch: !isProduction
// }))


// 配置静态资源加载中间件   //注意 防止与路由冲突
app.use(koaStatic(
	path.join(__dirname, './../build')
))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
	extension: 'ejs'
}))

//处理post请求 将form json解析
app.use(bodyParser())

// 401错误处理
app.use((ctx, next) => {
	return next().catch((err) => {
		console.log(err,'err');
		if (err.status === 401) {
			let result = {}
			result.code = '400000'
			result.data = null
			result.message = codes.FAIL_USER_NO_LOGIN
			ctx.status = 401
			ctx.body = result;
		} else {
			throw err;
		}
	})
})

// 需要放在路由前面 否则渲染请求已经返回
app.use(koajwt({
	secret: config.secretkey
}).unless({
	path: [/^\/$/,/^\/xcentz\/api\/loginIn$/]  // ^$唯一匹配/  由于前端是hash路由  故拦截除静态服务器以外的其他api  需要放到静态资源之后 路由之前
}))


// 初始化路由中间件和对于的allowedMethods
app.use(routers.routes()).use(routers.allowedMethods())


// 监听启动端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)
