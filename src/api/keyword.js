import { get, post } from 'utils/http'

export function login(data) {
	const result = post('/api/loginIn', data)
	return result
}

export function getNewList() {
	const result = get('/work/ad')
	return result
}

export function getList(params) {
	const result = post('/api/getList')
	return result
}

export function getJiJinChiCang(params) {
	const result = post('/api/getJiJinChiCang')
	return result
}

export function getGPinfo(params) {
	const result = post('/api/getGPinfo', params)
	return result
}

export function newCustomer(params) {
	const result = post('/api/createUser')
	return result
}
