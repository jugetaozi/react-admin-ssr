const router = require('koa-router')()
const eventSource = require('../controllers/event-source.js')

module.exports = router.get('/', eventSource)
