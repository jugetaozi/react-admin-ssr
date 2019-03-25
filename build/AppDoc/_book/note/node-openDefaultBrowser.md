# node实现自启动浏览器打开某网址



### 方法一、利用child_process.exec()

child_process是node.js的内置模块

```javascript
var c = require('child_process');



// 使用默认浏览器打开



c.exec('start http://www.baidu.com');



// 使用指定浏览器打开



c.exec('start firefox http://www.baidu.com');
```

### 方法二、利用[open](https://www.npmjs.com/package/open)模块

先安装 npm install open --save-dev

```javascript
var open = require('open');



// 使用默认浏览器打开



open('http://www.baidu.com');



// 使用指定浏览器打开



open('http://www.baidu.com', 'firefox');
```

### 方法三、利用[opn](https://www.npmjs.com/package/opn)模块

先安装 npm install opn --save-dev

```javascript
const opn = require('opn');



// 使用默认浏览器打开



opn('http://www.baidu.com');



// 使用指定浏览器打开



opn('http://www.baidu.com', {app: 'firefox'});
```

以上三种方法，node命令运行，都可以实现自启动浏览器打开[百度](https://www.baidu.com/s?wd=%E7%99%BE%E5%BA%A6&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)网址