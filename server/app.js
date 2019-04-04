const path = require('path')
const Koa = require('koa')
const koaLogger = require('koa-logger')
const views = require('koa-views')
const koaStatic = require('koa-static')
const config = require('./../config')
const routers = require('./routers/index')
const koaBody = require('koa-body')
const koajwt = require('koa-jwt')
const codes = require('./codes/users.js')
const http = require('http')
const wsConn = require('./websocket')
const sleep = require('./middleware/awake')

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
app.use(koaStatic(path.join(__dirname, './../build')))

// 配置服务端模板渲染引擎中间件
app.use(
	views(path.join(__dirname, './views'), {
		extension: 'ejs',
	})
)

//处理post请求 将form json解析
// app.use(bodyParser())
app.use(
	koaBody({
		multipart: true, // 支持文件上传
		formidable: {
			// uploadDir: path.join(__dirname, '../build/static/upload/'), // 设置文件上传目录
			keepExtensions: true, // 保持文件的后缀
			maxFieldsSize: 200 * 1024 * 1024, // 文件上传大小
			onFileBegin: (name, file) => {
				// 文件上传前的设置
				// console.log(`name: ${name}`);
				// console.log(file);
			},
		},
	})
)

// 401错误处理
app.use((ctx, next) => {
	return next().catch(err => {
		console.log(err, 'err')
		if (err.status === 401) {
			let result = {}
			result.code = '400000'
			result.data = null
			result.message = codes.FAIL_USER_NO_LOGIN
			ctx.status = 401
			ctx.body = result
		} else {
			throw err
		}
	})
})

// 自定义中间件 全局sleep功能
// app.use(sleep(1000))

// 需要放在路由前面 否则渲染请求已经返回
app.use(
	koajwt({
		secret: config.secretkey,
	}).unless({
		path: [/^\/$/, /^\/xcentz\/api\/loginIn$/, /^\/download/, /^\/es/], // ^$唯一匹配/  由于前端是hash路由  故拦截除静态服务器以外的其他api  需要放到静态资源之后 路由之前
	})
)

// 初始化路由中间件和对于的allowedMethods
app.use(routers.routes()).use(routers.allowedMethods())

//如果原来是用app.listen(3000);来启动服务，现在要改成用http来启动server
const server = http.createServer(app.callback())

//挂载websocket
wsConn(server)

// 监听启动端口
server.listen(config.port)

console.log(`the server is start at port ${config.port}`)
