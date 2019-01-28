/**
 * 主页子路由
 */

const router = require('koa-router')()
const index = require('../controllers/index.js')

module.exports = router
	.get('/', index)
