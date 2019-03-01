import { get, post } from 'utils/http'

export function download (data) {
	const result = post('/api/download', data)
	return result
}