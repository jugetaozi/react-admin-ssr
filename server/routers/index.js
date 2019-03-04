/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const home = require('./home')
const api = require('./api')
const download = require('./download')
// const work = require('./work')
// const error = require('./error')

router.use('/', home.routes(), home.allowedMethods())
router.use('/xcentz/api', api.routes(), api.allowedMethods())  //拦截所有的/xcentz/api开头的请求  allowedMethods规定了访问的方式
router.use('/download', download.routes(), download.allowedMethods())
// router.use('/work', work.routes(), work.allowedMethods())
// router.use('/error', error.routes(), error.allowedMethods())

module.exports = router
