// import { postLoginCode } from "../action/userReducer";
import { getList } from 'api/keyword'
const { delay } = require('../../utils/utils')
const init_state = {
	name: 'wudi',
}
export const getUserInfo = () => (dispatch, getState) => {
	return dispatch({
		type: 'API_GET_USER_INFO',
		payload: getList(),
	})
}

export default function reducer(state = init_state, action) {
	console.log('dispatchAction', action)
	switch (action.type) {
		case 'API_GET_USER_INFO_FULFILLED':
			return {
				...state,
				name: 'action.payload.message',
			}
		default:
			return {
				...state,
				name: 'action.payload.message',
			}
	}
}
