//websocket 连接配置
const socket = require('socket.io')

function mount(server) {
	//挂载socket
	const io = socket(server)
	//监听socket连接
	io.on('connection', client => {
		//connect和connection事件功能相似,但是被触发的时间不同.connect先于connetion.
		let _tempArr = []
		setInterval(() => {
			if (_tempArr.length >= 20) {
				_tempArr.shift()
			}
			_tempArr.push({
				time: new Date().toLocaleTimeString(),
				number: Math.ceil(200 * Math.random()),
			})
			client.emit('message', {
				chartData: _tempArr,
			})
		}, 2000)
	})
}

module.exports = server => {
	mount(server)
}
