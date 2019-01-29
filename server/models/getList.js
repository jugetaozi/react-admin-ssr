const dbUtils = require('./../utils/db-util')

const getList = {

  /**
   * 查找一个存在的视图
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
	async getExistList (options) {
		// let _sql = `
    // SELECT * from v_detail_review
    //   where first_name="${options.first_name}" or last_name="${options.last_name}"
		// 	limit 1`
		// console.log(_sql)
		let _sql = `SELECT * FROM v_detail_review `
		let result = await dbUtils.query(_sql)
		console.log(result);
		if (Array.isArray(result) && result.length > 0) {
			// result = result[0]
		} else {
			result = null
		}
		return result
	},

}


module.exports = getList
