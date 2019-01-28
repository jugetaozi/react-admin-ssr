/**
 * restful api 子路由
 */

const router = require('koa-router')()
const newList = require('./../controllers/newList')

const routers = router.post('/getList', newList.getNewList)


module.exports = routers
