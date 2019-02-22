import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = '/xcentz';

if (window.localStorage.getItem('token')) { //默认取localStorage里面的 token
	Axios.defaults.headers.common['Authorization'] = `Bearer ` + window.localStorage.getItem('token')
}

axios.interceptors.request.use(config => {
	//发送请求操作，统一再请求里加上userId 
	// config.headers['userId'] = window.sessionStorage.getItem("userId");
	return config;
}, error => {
	//发送请求错误操作
	console.log('请求失败')
	return Promise.reject(error);
})

axios.interceptors.response.use(response => {
	// window.location.hash = '#/login'
	// console.log(window.location);
	//对响应数据做操作
	if (parseInt(response.data.code, 10) === 0) {
		//console.log('请求成功');
		return Promise.resolve(response)
	}
	if (response.data.code === '2000401' || response.data.code === 2000401) {
		console.log('已过期重新登陆', response.data.code);
		window.location.href = '/login';
		return Promise.reject(response);
	}
	else {
		console.log('请求失败', response.data.code);
		return Promise.reject(response);
	}
}, error => {
	//对响应数据错误做操作
	console.log('请求error', error);
	return Promise.reject(error);
})

export function get (url, options) {
	return new Promise((resolve, reject) => {
		axios.get(url, options).then(res => {
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
}

export function post (url, data) {
	return new Promise((resolve, reject) => {
		axios.post(url, qs.stringify(data), {//需要qs格式化body 当传输格式为urlencoded时
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}
		).then(res => {
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
}
