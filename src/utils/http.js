import axios from 'axios'
import qs from 'qs'
import { hashTo, getStorage, removeStorage } from './utils'
import NProgress from 'nprogress'
import { message } from 'antd'

axios.defaults.baseURL = '/xcentz'

axios.interceptors.request.use(
	config => {
		NProgress.start() // Sorta same as .start()
		NProgress.inc(0.4) // Sorta same as .start()
		//发送请求操作，统一再请求里加上userId
		// config.headers['userId'] = window.sessionStorage.getItem("userId");
		// console.log(getStorage('_token'), "getStorage('_token')");
		if (getStorage('_token')) {
			config.headers.common['Authorization'] = `Bearer ` + getStorage('_token')
		}
		return config
	},
	error => {
		NProgress.done()
		//发送请求错误操作
		console.log('请求失败')
		return Promise.reject(error)
	}
)

axios.interceptors.response.use(
	response => {
		NProgress.done()
		// console.log(response, 'response');
		//对响应数据做操作
		if (parseInt(response.data.code, 10) === 0) {
			//console.log('请求成功');
			return Promise.resolve(response)
		}
		if (response.data.code === '2000401' || response.data.code === 2000401) {
			// console.log('已过期重新登陆', response.data.code);
			// hashTo('/login')
			// return Promise.reject(response);
		} else {
			console.log('响应失败', response.data.code)
			message.error(
				`响应失败,状态码:${response.data.code},错误信息:${
					response.data.message
				}`
			)
			return Promise.reject(response)
		}
	},
	error => {
		NProgress.done()
		if (error.response.status === 401) {
			switch (parseInt(error.response.data.code, 10)) {
				//未登录
				case 400000:
					removeStorage('_token')
					hashTo('/login')
			}
		}
		//对响应数据错误做操作
		console.log('请求error', error)
		message.error('响应失败' + error)
		return Promise.reject(error)
	}
)

export function get(url, options) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, options)
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}

export function post(url, data, options) {
	const _options = options || {}
	const ifNotQsStringfy =
		_options.headers &&
		_options.headers['Content-Type'] &&
		_options.headers['Content-Type'] !== 'application/x-www-form-urlencoded'
	return new Promise((resolve, reject) => {
		axios
			.post(url, ifNotQsStringfy ? data : qs.stringify(data), {
				//需要qs格式化body 当传输格式为urlencoded时
				headers: _options.headers || {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			})
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}
