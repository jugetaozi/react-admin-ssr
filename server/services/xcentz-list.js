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
	 * 创建用户
	 * @param {object}
	 */
	async createUser() {
		let result = await ListInfo.createUser()
		return result
	},
}

module.exports = XcentzList
