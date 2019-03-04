const File = require('./../services/file')
const dlXlsx = require('./dlXlsx.js');
const fs = require('fs');
const send = require('koa-send');

module.exports = {
	/**
	 * download
	 * @param    {obejct} ctx 上下文对象
	 */
	async download (ctx) {
		const result = await File.download(ctx.request.body)

		//生成xlsx文件
		const _randomId = await dlXlsx(result.data);
		result.data = {
			id: _randomId
		}
		ctx.body = result
		//类型
		// ctx.type = '.xlsx';
		//请求返回，生成的xlsx文件
		// ctx.body = fs.readFileSync('output.xlsx');
		//请求返回后，删除生成的xlsx文件，不删除也行，下次请求回覆盖
		// fs.unlink('output.xlsx');
	},

	async getDownload (ctx) {
		//类型
		ctx.type = '.xlsx';
		//请求返回，生成的xlsx文件
		const filePath = 'build/static/file/' + ctx.params.id + '.xlsx'
		ctx.body = fs.readFileSync(filePath);
		//请求返回后，删除生成的xlsx文件
		fs.unlink(filePath, function (err) {
			if (err) {
				throw err;
			}
			console.log('文件:删除成功！');
		});
	}

}
