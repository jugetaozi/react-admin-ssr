const axios = require('axios')
const dbUtils = require('./../utils/db-util')

const getList = {
	/**
	 * 查找一个存在的视图
	 * @param  {obejct} options 查找条件参数
	 * @return {object|null}        查找结果
	 */
	async getExistList(options) {
		// let _sql = `
		// SELECT * from v_detail_review
		//   where first_name="${options.first_name}" or last_name="${options.last_name}"
		// 	limit 1`
		// console.log(_sql)
		let _sql = `SELECT * FROM v_amz_asin_review `
		let result = await dbUtils.query(_sql)
		// console.log(result);
		if (Array.isArray(result) && result.length > 0) {
			// result = result[0]
		} else {
			result = null
		}
		return result
	},

	/**
	 * 基金持仓
	 * @param  {obejct} options
	 * @return {object|null}
	 */
	async getJiJinChiCang(options) {
		// let _sql = `SELECT * FROM v_amz_asin_review `
		// let result = await dbUtils.query(_sql)
		// console.log(result);
		let result
		await axios
			.get('https://api.doctorxiong.club/v1/fund/position?code=513050')
			.then(res => {
				result = res.data.data
			})
			.catch(err => {
				console.log(err, '失败')
				result = err
			})
		return result
	},
	/**
	 * 股票信息
	 * @param  {Array} [{ gpCode: '123', gpMarket: 'US' }]
	 * @return {object|null}
	 */
	async getGPinfo(params) {
		let _temStr = 'list='
		let result
		for (let index = 0; index < params.length; index++) {
			console.log(params[index])
		}
		params.gpList.forEach(item => {
			if (item.gpMarket === 'US') {
				_temStr += 'gb_' + item.gpCode+','
			} else if (item.gpMarket === 'HK') {
				_temStr += 'hk' + item.gpCode + ','
			} else if (item.gpMarket === 'ZS') {
				_temStr += 'int' + item.gpCode + ','
			} else {
				result = null
			}
		})
		// console.log(_temStr, {}.toString.call(params.gpList))
		await axios
			.get('http://hq.sinajs.cn/' + _temStr)
			.then(res => {
				// console.log(res.data, 'res')
				let data = res.data
				result = data
			})
			.catch(err => {
				console.log(err, '失败')
				result = err
			})
		return result
	},

	async createUser() {
		let _sql = `CREATE TABLE  User_Info_N (
  id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(255) DEFAULT NULL,
  password varchar(255) DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  nick varchar(255) DEFAULT NULL,
  detail_info longtext DEFAULT NULL,
  create_time varchar(20) DEFAULT NULL,
  modified_time varchar(20) DEFAULT NULL,
  level int(11) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`
		let result
		await dbUtils
			.createTable(_sql)
			.then(res => {
				console.log('ok_' + res)
				result = res
			})
			.catch(err => {
				console.log('err_' + err)
				result = null
			})
		return result
	},
}

module.exports = getList
