const dbUtils = require('./../utils/db-util')

const lotteryModel = {
	/**
	 * 查找一个存在的视图
	 * @param  {obejct} options 查找条件参数
	 * @return {object|null}        查找结果
	 */
	async queryLotteryData(options) {
		// let _sql = `
		// SELECT * from v_detail_review
		//   where first_name="${options.first_name}" or last_name="${options.last_name}"
		// 	limit 1`
		// console.log(_sql)
		console.log(options)
		let _sql = `SELECT * from data where dateNumber`
		for (let k in options) {
			console.log('red1 red2 red3 red4 red5 red6 blue'.indexOf('blue'))
			if ('red1 red2 red3 red4 red5 red6 blue'.indexOf(k) >= 0 && options[k]) {
				_sql += ` and ${k}=${options[k]}`
			} else if ('dateRang'.indexOf(k) >= 0 && options[k].length === 2) {
				_sql += `and date between "${options.dateRange[0]}" and "${
					options.dateRange[1]
				}"`
			}
		}
		console.log(_sql)
		let result = await dbUtils.query(_sql)
		if (Array.isArray(result) && result.length > 0) {
			// result = result[0]
		} else {
			result = []
			console.log(result)
		}
		return result
	},
}

module.exports = lotteryModel
