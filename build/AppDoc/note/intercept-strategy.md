## 拦截策略: / 和 /login页面不设JWT验证
```javascript
// 需要放在路由前面 否则渲染请求已经返回
app.use(koajwt({
	secret: config.secretkey
}).unless({
	path: [/^\/$/,/^\/xcentz\/api\/loginIn$/]  // ^$唯一匹配/  由于前端是hash路由  故拦截除静态服务器以外的其他api  需要放到静态资源之后 路由之前
}))

// 其他请求若未登录返回401状态码

```

## token记住时间为2H 超时需要重新登录
```javascript
if (Array.isArray(result) && result.length > 0) {
			const token = jwt.sign({
				name: result.name,
				id: result.id
			}, config.secretkey, { expiresIn: '2h' });
			_obj.data = token
			_obj.message = "登录成功"
			_obj.code = 0
		} else {
			_obj.message = codes.FAIL_USER_NAME_OR_PASSWORD_ERROR
		}
```

## 每次路由变更检测是否当前路由需要权限  然后检查token 若需要权限而且无token跳转登录页面

> 不需要权限的页面: /login和错误页面ErrorPage