const UserInfo = require('./../services/user-info')
const codes = require('../codes/users')

module.exports = {
	/**
	 * user-info
	 * @param    {obejct} ctx 上下文对象
	 */
	async loginIn (ctx) {
		let result = {
			data: null,
			message: '',
			code: 999999,
		}
		const _data = await UserInfo.loginIn(ctx.request.body)
		if (_data) {
			result.data = _data
			result.code = 0
			result.message = 'success'
		} else {
			result.message = codes.FAIL_USER_NAME_OR_PASSWORD_ERROR
			// TODO
		}
		ctx.body = result
	},
}
