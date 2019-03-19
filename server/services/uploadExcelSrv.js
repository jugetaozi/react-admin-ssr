//接收excel文件，保存解析返回objects
const xlsx = require('xlsx')
const fs = require('fs')
const path = require('path')
const File = require('./file')
const { generatorFileName } = require('../utils/utils')
const downPath = path.resolve(__dirname, '../../build/file/upload')

async function getExcel(ctx) {
	// console.log(ctx.request.files.ylnum);
	const file = ctx.request.files.ylnum // 获取上传文件
	const reader = fs.createReadStream(file.path) // 创建可读流
	const ext = file.name.split('.').pop() // 获取上传文件扩展名
	const filePath = `${downPath}/${generatorFileName()}.${ext}`

	const upStream = fs.createWriteStream(filePath) // 创建可写流
	const getRes = await getFile(reader, upStream) //等待数据存储完成

	const datas = [] //可能存在多个sheet的情况
	if (!getRes) {
		//没有问题
		const workbook = xlsx.readFile(filePath)
		const sheetNames = workbook.SheetNames // 返回 ['sheet1', ...]
		for (const sheetName of sheetNames) {
			const worksheet = workbook.Sheets[sheetName]
			const data = xlsx.utils.sheet_to_json(worksheet)
			datas.push(data)
		}
		return {
			status: true,
			datas,
		}
	} else {
		return {
			status: false,
			msg: '上传文件错误',
		}
	}
}

async function getExcelObjs(ctx) {
	const getRes = await getExcel(ctx)
	let _obj = {
		data: null,
		code: 999999,
		message: '',
	}
	if (getRes.status) {
		if (getRes.datas.length > 1) {
			return _obj
		} else {
			//得到的是数组
			const objs = getRes.datas[0]
			_obj = {
				data: getRes.datas[0],
				code: 0,
				message: '上传数据成功',
			}
			await File.uploadExcel(objs)
			return _obj
		}
	} else {
		return _obj
	}
}

function getFile(reader, upStream) {
	return new Promise(function(result) {
		let stream = reader.pipe(upStream) // 可读流通过管道写入可写流
		stream.on('finish', function(err) {
			result(err)
		})
	})
}
module.exports = {
	getExcelObjs,
}
