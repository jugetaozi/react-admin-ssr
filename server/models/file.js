const dbUtils = require('./../utils/db-util')
const codes = require('../codes/users')
const config = require('../../config.js')
const file = {
  /**
   * download 
	 * 
   */
	async download (options) {
		// let _sql = `
		// SELECT * from v_detail_review
		//   where first_name="${options.first_name}" or last_name="${options.last_name}"
		// 	limit 1`

		// let _sql = `SELECT * FROM user_info where name="${options.name}" and password="${options.password}"`
		let _sql = `SELECT * FROM pub_YLnum`
		// console.log(_sql);
		let result = await dbUtils.query(_sql)
		let _obj = {
			data: null,
			code: 999999,
			message: ''
		}
		if (Array.isArray(result) && result.length > 0) {
			_obj.data = result
			_obj.message = "success"
			_obj.code = 0
		} else {
			_obj.message = "error"
		}
		return _obj
	},
}


module.exports = file
