import { get, post } from 'utils/http'

export function download(data) {
	const result = post('/api/download', data)
	return result
}

export function uploadExcel(data, options) {
	const result = post('/api/uploadExcel', data, options)
	return result
}
