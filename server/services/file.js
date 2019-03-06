/**
 * 用户信息
 */

const file = require('./../models/file')

const user = {
	/**
	 * download
	 * @param {Object} options 
	 */
	async download (options) {
		let result = await file.download(options)
		return result
	},
	
	async uploadExcel (options) {
		let result = await file.uploadExcel(options)
		return result
	},
}
module.exports = user
