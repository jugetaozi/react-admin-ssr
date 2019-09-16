const Lottery = require('./../services/lottery')

module.exports = {
	/**
	 * Lottery
	 * @param    {obejct} ctx 上下文对象
	 */
	async queryLotteryData(ctx) {
		let result = {
			data: null,
			message: '',
			code: 999999,
		}
		const _data = await Lottery.queryLotteryData(ctx.request.body)
		if (_data) {
			result.data = _data
			result.code = 0
			result.message = 'success'
		} else {
			result.message = 'no-message'
			// TODO
		}
		ctx.body = result
	},
}
