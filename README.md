# 系统使用介绍 Introduction

## client 浏览器端
- react 16.7 + antd 13.3+ webpack 4.29 + redux + reat-redux

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
## 已实现功能

- 支持ES6/ES7/Promise 
- 登录页面 + 首页菜单layout布局
- 登录权限验证/登录态持久化
- 全局的登录状态的路由拦截 接口验证
- 登录密码aes-256-cbc加密
- gitbook DOC