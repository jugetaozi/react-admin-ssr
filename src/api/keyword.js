import {get, post} from 'utils/http'

export function getNewList() {
	const result = get('/work/ad')
	return result
}

export function getList(params) {
	const result = post('/api/getList')
	return result
}
