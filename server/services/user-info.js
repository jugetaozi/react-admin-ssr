/**
 * 用户信息
 */

const validator = require('validator')
const UserInfo = require('./../models/user-info')

const user = {
	/**
	 * 用户登录
	 * @param {Object} options
	 */
	async loginIn(options) {
		let result = await UserInfo.loginIn(options)
		return result
	},
}
module.exports = user
