# Xcentz-系统使用介绍 Introduction

## client 浏览器端
- react 16.7 + antd 13.3+ webpack 4.29

## server  服务侧
- koa 2.6 + koa-router + mysql +ejs模板引擎

## start 启动方式
```
npm i
配置config // 填写mysql数据库配置
npm init //数据库初始化 DOC初始化
npm run dev //启动服务侧 客户侧 打开浏览器

open in http://localhost:8888/
```



## 待解决问题 ( ToDoList )
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
