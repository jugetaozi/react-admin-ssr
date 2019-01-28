const getList = require('./../services/getList')

module.exports = {
	/**
	 * getList
	 * @param    {obejct} ctx 上下文对象
	 */
	async getNewList(ctx) {
		let result = {
			success: false,
			message: '',
			data: null,
		}
		const _data = await getList.get({first_name: 'PENELOPE', last_name: 'GUINESS'})
		if (_data) {
			result.data = _data
			result.success = true
		} else {
			result.message = 'no-message'
			// TODO
		}
		ctx.body = result
	},
}
