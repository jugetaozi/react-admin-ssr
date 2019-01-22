import {get, post} from 'utils/http'

export function getNewList() {
	const result = get('/ad');
  return result;
}

export function postDate (params) {
	const result = post('/adpost');
	return result;
}
