const File = require('./../services/file')
module.exports = {
	/**
	 * download
	 * @param    {obejct} ctx 上下文对象
	 */
	async download (ctx) {
		const result = await File.download(ctx.request.body)
		ctx.body = result
	}
}
