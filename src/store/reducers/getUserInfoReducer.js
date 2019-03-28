// import { postLoginCode } from "../action/userReducer";
// import {  } from 'api/keyword'
import jwt from 'jsonwebtoken'
import { getStorage } from 'utils/utils'

const init_state = {
	userInfo: null,
}
export const changeUserInfo = payload => (dispatch, getState) => {
	return dispatch({
		type: 'API_CHANGE_USER_INFO',
		payload,
	})
}

export const getUserInfo = () => (dispatch, getState) => {
	if (getStorage('_token')) {
		return dispatch({
			type: 'API_GET_USER_INFO',
			payload: jwt.decode(getStorage('_token')),
		})
	} else {
		return dispatch({
			type: 'API_GET_USER_INFO',
			payload: null,
		})
	}
}

export default function reducer(state = init_state, action) {
	console.log('getUserInfoReduceractionDispatchAction', action) //初始会触发三次
	switch (action.type) {
		case 'API_CHANGE_USER_INFO_FULFILLED': //没有fulfilled状态
			return {
				...state,
				userInfo: action.payload,
			}
		case 'API_CHANGE_USER_INFO':
			return {
				...state,
				userInfo: action.payload,
			}

		case 'API_GET_USER_INFO':
			return {
				...state,
				userInfo: action.payload,
			}

		default:
			return {
				...state,
			}
	}
}
