/**
 * 主页子路由
 */

const router = require('koa-router')()
const index = require('../controllers/index.js')
const eventSource = require('../controllers/event-source.js')

module.exports = router.get('/', index)
	// .get('/es', eventSource)
