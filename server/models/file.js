const dbUtils = require('./../utils/db-util')
const codes = require('../codes/users')
const config = require('../../config.js')
const downloadSqlLib = require('../sqlLib/download')
const file = {
	/**
	 * download
	 *
	 */
	async download(options) {
		// let _sql = `
		// SELECT * from v_detail_review
		//   where first_name="${options.first_name}" or last_name="${options.last_name}"
		// 	limit 1`

		// let _sql = `SELECT * FROM User_Info_N where name="${options.name}" and password="${options.password}"`
		// let _sql = `SELECT * FROM Pub_Ylnum_N`
		let _obj = {
			data: null,
			code: 999999,
			message: '',
		}
		let _sql = ''
		if (!Object.keys(options).length || !options['target']) {
			_obj.message = '参数target不能为空'
			return _obj
		}

		if (downloadSqlLib[options.target]) {
			_sql = downloadSqlLib[options.target]
		} else {
			//如果没有配置 则为默认查询
			_sql = `SELECT * FROM ${options.target} WHERE ${options.target}.delFlag=0`
		}
		console.log(
			_sql,
			'sql语句__sql语句__sql语句__sql语句__sql语句__sql语句__sql语句__sql语句__'
		)

		let result = await dbUtils.query(_sql)

		if (Array.isArray(result) && result.length >= 0) {
			// if (result.length === 0) {
			// 	_obj.data = null
			// 	_obj.message = '当前表格无数据'
			// 	_obj.code = 999999
			// } else {
			_obj.data = result
			_obj.message = 'success'
			_obj.code = 0
			// }
		} else {
			_obj.message = 'error'
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

	// 	// let _sql = `SELECT * FROM User_Info_N where name="${options.name}" and password="${options.password}"`

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
	// 	// let _sql = `REPLACE INTO Pub_Ylnum_N (${Object.keys(datas[0]).join(',')}) VALUES ${values};`//插入以及更新
	// 	let _sql = `INSERT INTO Pub_Ylnum_N (${Object.keys(datas[0]).join(',')}) VALUES ${values} ON DUPLICATE KEY UPDATE ${ON_DUPLICATE_KEY_UPDATE};`

	// 	let resultUpdate = await dbUtils.query(_sql)

	// 	//去除没有的数据   转换逻辑标志位
	// 	// let _sql_delete = `DELETE FROM Pub_Ylnum_N WHERE Pub_Ylnum_N.id NOT IN (${localIds})`
	// 	let _sql_logic_delete = `UPDATE Pub_Ylnum_N SET Pub_Ylnum_N.delFlag=1 WHERE Pub_Ylnum_N.id NOT IN (${localIds})`
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
	async uploadExcel(ctx, datas) {
		let tableName = ctx.request.body.tableName //上传的表名
		//每次上传 先转换逻辑标志位
		let _sql_logic_delete = `UPDATE ${tableName} SET ${tableName}.delFlag=${tableName}.delFlag-1`

		let resultDelete = await dbUtils.query(_sql_logic_delete)

		let values = ''
		let _obj = {
			data: null,
			code: 999999,
			message: '',
		}
		if (datas.length) {
			//更新上传的数据
			datas.map(_obj => {
				values += `("${Object.values(_obj).join('","')}"),`
			})

			values = values.substr(0, values.length - 1)
			let _sql = `REPLACE INTO ${tableName} (${config.excelHeaders[
				tableName
			].join(',')}) VALUES ${values};`
			let resultUpdate = await dbUtils.query(_sql)
			if (
				Array.isArray(resultUpdate) &&
				Array.isArray(resultDelete) &&
				resultUpdate.length > 0 &&
				resultDelete.length > 0
			) {
				_obj.data = resultUpdate
				_obj.message = 'success'
				_obj.code = 0
			} else {
				_obj.message = 'error'
			}
			return _obj
		} else {
			//如果没有上传数据 resultDelete结果即为本次操作结果
			if (Array.isArray(resultDelete) && resultDelete.length > 0) {
				_obj.data = resultDelete
				_obj.message = 'success'
				_obj.code = 0
			} else {
				_obj.message = 'error'
			}
			return _obj
		}
	},
}

module.exports = file
