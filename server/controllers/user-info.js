const UserInfo = require('./../services/user-info')

module.exports = {
	/**
	 * user-info
	 * @param    {obejct} ctx 上下文对象
	 */
	async loginIn (ctx) {
		const result = await UserInfo.loginIn(ctx.request.body)
		ctx.body = result
	}
}
