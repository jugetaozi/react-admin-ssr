const fs = require('fs')
const getSqlContentMap = require('./util/get-sql-content-map')
const initLoginInfo = require('../../config/initLoginInfo')
const { aesEncrypt } = require('../utils/crypto')
const { query } = require('./util/db')

// 打印脚本执行日志
const eventLog = function(err, sqlFile, index) {
	if (err) {
		console.log(
			`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败 o(╯□╰)o ！`
		)
	} else {
		console.log(
			`[SUCCESS] sql脚本文件: ${sqlFile} 第${index +
				1}条脚本 执行成功 O(∩_∩)O !`
		)
	}
}

// 获取所有sql脚本内容
let sqlContentMap = getSqlContentMap()

// 执行建表sql脚本
const createAllTables = async () => {
	if (sqlContentMap['user_info.sql']) {
		let _tempStr = sqlContentMap['user_info.sql']
		if (initLoginInfo.length) {
			initLoginInfo.forEach(item => {
				_tempStr += `INSERT INTO \`User_Info_N\` set name = '${aesEncrypt(
					item.name
				)}', nick = '${item.nick}', detail_info = '${
					item.detail_info
				}', email = '${item.email}', level = ${item.level}, role = ${item.role}, password = '${aesEncrypt(item.password)}';`
			})
		}
		sqlContentMap['user_info.sql'] = _tempStr
	}
	console.log('user_info.sql', 'user_info.sqluser_info.sqluser_info.sql')

	for (let key in sqlContentMap) {
		console.log(sqlContentMap, 'sqlContentMapsqlContentMap')
		let sqlShell = sqlContentMap[key]
		let sqlShellList = sqlShell.split(';')

		for (let [i, shell] of sqlShellList.entries()) {
			if (shell.trim()) {
				let result = await query(shell)
				if (result.serverStatus * 1 === 2) {
					eventLog(null, key, i)
				} else {
					eventLog(true, key, i)
				}
			}
		}
	}
	console.log('sql脚本执行结束！')
	console.log('请按 ctrl + c 键退出！')
}

createAllTables()
