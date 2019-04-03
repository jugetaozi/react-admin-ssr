// import { postLoginCode } from "../action/userReducer";
import { getList } from 'api/keyword'
const init_state = {
	systemTime: '',
	evtSourceExist: false,
	evtSource: null,
}
export const updateSystemInfo = data => (dispatch, getState) => {
	return dispatch({
		type: 'UPDATE_SYSTEM_INFO',
		payload: data,
	})
}

export const establishEvtSource = () => (dispatch, getState) => {
	if (!getState().getSystemInfo.evtSourceExist) {
		const load = new Promise((resolve, reject) => {
			const evtSource = new EventSource(
				window.location.protocol + '//' + window.location.host + '/es'
			)
			evtSource.onopen = e => {
				resolve(evtSource, e)
			}
			evtSource.addEventListener('HandleGetTime', e => {
				//必须用addEventListener才能监听到
				// updateSystemInfo(e.data)(dispatch, getState)
				dispatch({
					type: 'UPDATE_SYSTEM_INFO',
					payload: JSON.parse(e.data),
				})
			})
			evtSource.onerror = e => {
				reject(e)
			}
		})
		return dispatch({
			type: 'ESTABLISH_EVENT_SOURCE',
			payload: load,
		})
	} else {
		return getState().getSystemInfo.evtSource
	}
}

export default function reducer(state = init_state, action) {
	// console.log('getSystemInfo', action, state)
	switch (action.type) {
		case 'ESTABLISH_EVENT_SOURCE_FULFILLED':
			return {
				...state,
				evtSource: action.payload,
			}
		case 'ESTABLISH_EVENT_SOURCE_PENDING': //promise只有pending和resolve reject三种状态
			return {
				...state,
				evtSourceExist: true,
			}

		case 'UPDATE_SYSTEM_INFO': //promise只有pending和resolve reject三种状态
			return {
				...state,
				...action.payload,
			}

		default:
			return {
				...state,
				// name: 'action.payload.message',
			}
	}
}
