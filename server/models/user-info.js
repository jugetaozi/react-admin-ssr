const dbUtils = require('./../utils/db-util')

const userInfo = {

  /**
   * 用户登录
	 * 
   */
	async loginIn (options) {
		// let _sql = `
		// SELECT * from v_detail_review
		//   where first_name="${options.first_name}" or last_name="${options.last_name}"
		// 	limit 1`
		console.log(options)
		// let _sql = `SELECT * FROM user_info where name="${options.name}" and password="${options.password}"`
		let _sql = `SELECT * FROM user_info where name="${options.name}" and password="${options.password}"`
		console.log(_sql);
		let result = await dbUtils.query(_sql)
		console.log(result);
		if (Array.isArray(result) && result.length > 0) {
			result = result[0]
		} else {
			result = null
		}
		return result
	},
}


module.exports = userInfo
