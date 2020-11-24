/**
 * 用户业务操作
 */

const validator = require('validator')
const ListInfo = require('./../models/list-info')
const { delay } = require('../utils/utils')

const XcentzList = {
	/**
	 * 获取列表
	 * @param  {object} options 用户信息
	 * @return {object}      创建结果
	 */

	async getExistList(options) {
		// await delay(3000)
		let result = await ListInfo.getExistList(options)
		return result
	},
	
	/**
	 * 获取基金持仓
	 * @param  {object} options 
	 * @return {object}      
	 */

	async getJiJinChiCang(options) {
		// await delay(3000)
		let result = await ListInfo.getJiJinChiCang(options)
		return result
	},

	
	/**
	 * 获取股票信息
	 * @param  {object} options 
	 * @return {object}      
	 */

	async getGPinfo(options) {
		// await delay(3000)
		let result = await ListInfo.getGPinfo(options)
		return result
	},



	/**
	 * 创建用户
	 * @param {object}
	 */
	async createUser() {
		let result = await ListInfo.createUser()
		return result
	},
}

module.exports = XcentzList
