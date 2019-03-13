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
		// let _sql = `SELECT * FROM pub_YLnum`
		let _sql = `SELECT * FROM pub_YLnum WHERE pub_YLnum.is_deleted =0 `
		// console.log(_sql);
		let result = await dbUtils.query(_sql)
		console.log(result);
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

	/**
	 * 版本1 删除重复冗余数据 更新已有数据 插入没有的数据
	 */
	// async uploadExcel (datas) {
	// 	// let _sql = `
	// 	// SELECT * from v_detail_review
	// 	//   where first_name="${options.first_name}" or last_name="${options.last_name}"
	// 	// 	limit 1`

	// 	// let _sql = `SELECT * FROM user_info where name="${options.name}" and password="${options.password}"`

	// 	let values = ''
	// 	let localIds = ''
	// 	datas.map(_obj => {
	// 		localIds += _obj.id + ','
	// 		// console.log(Object.keys(_obj), Object.values(_obj));
	// 		values += `("${Object.values(_obj).join('","')}"),`
	// 	})
	// 	values = values.substr(0, values.length - 1);
	// 	localIds = localIds.substr(0, localIds.length - 1);
	// 	let _tempArr = config.excelHeader.concat([])
	// 	let ON_DUPLICATE_KEY_UPDATE = ''
	// 	_tempArr.shift();
	// 	_tempArr.forEach((item) => {
	// 		ON_DUPLICATE_KEY_UPDATE += `${item}=VALUES(${item}),`
	// 	}) //去除id
	// 	ON_DUPLICATE_KEY_UPDATE = ON_DUPLICATE_KEY_UPDATE.substr(0, ON_DUPLICATE_KEY_UPDATE.length - 1)
	// 	// let _sql = `REPLACE INTO pub_YLnum (${Object.keys(datas[0]).join(',')}) VALUES ${values};`//插入以及更新
	// 	let _sql = `INSERT INTO pub_YLnum (${Object.keys(datas[0]).join(',')}) VALUES ${values} ON DUPLICATE KEY UPDATE ${ON_DUPLICATE_KEY_UPDATE};`
		
	// 	let resultUpdate = await dbUtils.query(_sql)
		
	// 	//去除没有的数据   转换逻辑标志位
	// 	// let _sql_delete = `DELETE FROM pub_YLnum WHERE pub_YLnum.id NOT IN (${localIds})`
	// 	let _sql_logic_delete = `UPDATE pub_YLnum SET pub_YLnum.is_deleted=1 WHERE pub_YLnum.id NOT IN (${localIds})`
	// 	let resultDelete = await dbUtils.query(_sql_logic_delete)
	// 	// let resultDelete = await dbUtils.query(_sql_delete)

	// 	let _obj = {
	// 		data: null,
	// 		code: 999999,
	// 		message: ''
	// 	}
	// 	if (Array.isArray(resultUpdate) && Array.isArray(resultDelete) && resultUpdate.length > 0 && resultDelete.length > 0) {
	// 		_obj.data = result
	// 		_obj.message = "success"
	// 		_obj.code = 0
	// 	} else {
	// 		_obj.message = "error"
	// 	}
	// 	return _obj
	// },

	/**
	 *版本2 1.不删除 增加逻辑删除位 删除前一次的上传记录 然后执行replace语句.
	 *
	 */
	async uploadExcel (datas) {
		//每次上传 先转换逻辑标志位
		let _sql_logic_delete = `UPDATE pub_YLnum SET pub_YLnum.is_deleted=1`
		let resultDelete = await dbUtils.query(_sql_logic_delete)

		let values = ''
		datas.map(_obj => {
			values += `("${Object.values(_obj).join('","')}"),`
		})
		values = values.substr(0, values.length - 1);
		let _sql = `REPLACE INTO pub_YLnum (${Object.keys(datas[0]).join(',')}) VALUES ${values};`

		let resultUpdate = await dbUtils.query(_sql)


		let _obj = {
			data: null,
			code: 999999,
			message: ''
		}
		if (Array.isArray(resultUpdate) && Array.isArray(resultDelete) && resultUpdate.length > 0 && resultDelete.length > 0) {
			_obj.data = resultUpdate
			_obj.message = "success"
			_obj.code = 0
		} else {
			_obj.message = "error"
		}
		return _obj
	},

}


module.exports = file
