const XcentzList = require('./../services/xcentz-list')

module.exports = {
	/**
	 * XcentzList
	 * @param    {obejct} ctx 上下文对象
	 */
	async getNewList(ctx) {
		let result = {
			data: null,
			message: '',
			code: 999999,
		}
		const _data = await XcentzList.getExistList({
			first_name: 'PENELOPE',
			last_name: 'GUINESS',
		})
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

	/**
	 * XcentzList
	 * @param    {obejct} ctx 上下文对象
	 */
	async getJiJinChiCang(ctx) {
		let result = {
			data: null,
			message: '',
			code: 999999,
		}
		const _data = await XcentzList.getJiJinChiCang({
			first_name: 'PENELOPE',
			last_name: 'GUINESS',
		})
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
	/**
	 * XcentzList
	 * @param    {obejct} ctx 上下文对象
	 */
	async getGPinfo(ctx,next) {
		//ctx.request.body  传递参数
		let result = {
			data: null,
			message: '',
			code: 999999,
		}
		// console.log(ctx.request.body)
		const _data = await XcentzList.getGPinfo(ctx.request.body)
		if (_data) {
			result.data = _data
			result.code = 0
			result.message = 'success'
		} else {
			result.message = 'no-message'
			// TODO
		}
		ctx.body = result
		ctx.response.header['content-type'] = 'html'
		console.log(ctx.response.header['content-type'], 'ctx.response')
	},



	async createUser(ctx) {
		let result = {
			data: null,
			message: '',
			code: 999999,
		}
		const _data = await XcentzList.createUser()
		if (_data) {
			result.code = 0
		} else {
		}
		ctx.body = result
	},
}
