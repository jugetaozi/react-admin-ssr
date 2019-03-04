/**
 * restful api 子路由
 */

const router = require('koa-router')()
const File = require('./../controllers/file')

const routers = router
  .get('/:id', File.getDownload)


module.exports = routers
