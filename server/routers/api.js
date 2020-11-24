/**
 * restful api 子路由
 * //ctx.request.body  传递参数
 */

const router = require('koa-router')()
const XcentzList = require('./../controllers/xcentz-list')
const UserInfo = require('./../controllers/user-info')
const File = require('./../controllers/file')

const routers = router
	.post('/getList', XcentzList.getNewList)
	.post('/getJiJinChiCang', XcentzList.getJiJinChiCang)
	.post('/getGPinfo', XcentzList.getGPinfo)
	.post('/createUser', XcentzList.createUser)
	.post('/loginIn', UserInfo.loginIn)
	.post('/download', File.download)
	.post('/uploadExcel', File.uploadExcel)

module.exports = routers
