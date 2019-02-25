var cp = require('child_process')
var config = require('../config.js')

var port = config.port
cp.exec('start http://localhost:' + port);  // 自动打开默认浏览器