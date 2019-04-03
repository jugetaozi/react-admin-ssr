var PassThrough = require('stream').PassThrough
var Readable = require('stream').Readable
const sse = (stream, event, data) => {
	return stream.push(`event:${event}\ndata: ${JSON.stringify(data)}\n\n`)
	//    return stream.write(`event:${ event }\ndata: ${ JSON.stringify(data) }\n\n`);
}
module.exports = async ctx => {
	/**
	 * 服务端返回数据需要特殊的格式，它分为四种消息类型：event, data, id, retry
	 */
	var stream = new PassThrough() //PassThrough();
	ctx.set({
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		Connection: 'keep-alive',
	})
	sse(stream, 'HandleGetTime', { systemTime: Date.now() })
	ctx.body = stream
	setInterval(() => {
		sse(stream, 'HandleGetTime', {
			systemTime: Date.now(),
		})
	}, 1000)
}
