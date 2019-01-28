import {get, post} from 'utils/http'

export function getNewList() {
	const result = get('/work/ad');
  return result;
}

export function postDate (params) {
	const result = post('/work/adpost');
	return result;
}
