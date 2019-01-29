## client
- react 16.7 + antd 13.3+ webpack 4.29

## server
- koa 2.6 + koa-router + mysql +ejs模板引擎

## start
```
npm i
配置config
npm run s_start //启动服务端
npm run c_start //启动客户端
npm init_sql //测试数据库链接

打开 http://localhost:8888/
```



##待解决问题 
* 前端HMR还未实现 目前实现了hot-watch
* 后台错误统计还未实现
* webpack4 mini-css-extract-plugin 会导致class失效 
* 打包CSS在js文件当中
* 请求 utils等等 需要封装
* 前端路由采用history模式  刷新问题还需解决
* 启动脚本分别启动 
* 生产模式还未测试
* 测试工具还未引入
* 性能问题
* 安全性问题
