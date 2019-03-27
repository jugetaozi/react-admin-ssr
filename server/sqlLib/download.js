const headersName = require('../../config/excelHeaderConfig.js')

const sqlCreator = (tableName, dataKeyArr, format) => {
	let _sql_str = `select `

	dataKeyArr.forEach(item => {
		_sql_str += `DATE_FORMAT(${tableName}.${[item]}, "${format}") as ${item},`
	})
	headersName[tableName].forEach(item => {
		if (dataKeyArr.indexOf(item) < 0) {
			_sql_str += `${tableName}.${item},`
		}
	})
	_sql_str = _sql_str.substring(0, _sql_str.length - 1)
	_sql_str += ` from ${tableName} WHERE ${tableName}.delFlag=0`
	return _sql_str
}

module.exports = {
	Pub_Ylnum_N: '',
	Asc_Bussiness_Report_N: sqlCreator(
		'Asc_Bussiness_Report_N',
		['SnapDate'],
		'%Y-%m-%d'
	),
	Asc_Sponsored_Products_Advertised_N: sqlCreator(
		'Asc_Sponsored_Products_Advertised_N',
		['SnapDate'],
		'%Y-%m-%d'
	),
}
