/**
 * 用户业务操作
 */

const validator = require('validator')
const userModel = require('./../models/getList')

const getList = {
	/**
	 * 创建用户
	 * @param  {object} options 用户信息
	 * @return {object}      创建结果
	 */
	async get(options) {
		let result = await userModel.getExistList(options)
		return result
	},
}

module.exports = getList
