/**
 * 用户业务操作
 */

const validator = require('validator')
const Lottery = require('./../models/lottery')
const { delay } = require('../utils/utils')

const LotteryService = {
	/**
	 * 获取列表
	 * @param  {object} options 用户信息
	 * @return {object}      创建结果
	 */

	async queryLotteryData(options) {
		// await delay(3000)
		let result = await Lottery.queryLotteryData(options)
		return result
	},
}

module.exports = LotteryService
