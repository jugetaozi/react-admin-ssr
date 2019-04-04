// import { postLoginCode } from "../action/userReducer";
//全局websocket和全局evtsource
import { getList } from 'api/keyword'
import socketIo from 'socket.io-client'

const init_state = {
	evtSourceExist: false,
	evtSource: null,
	evtSourceMsg: {},
	websocketMsg: {},
	isSocketExist: false,
	io: null,
}
export const updateEventSourceMsg = data => (dispatch, getState) => {
	return dispatch({
		type: 'UPDATE_EVENT_SOURCE_MSG',
		payload: data,
	})
}
export const updateWebsocketMsg = data => (dispatch, getState) => {
	return dispatch({
		type: 'UPDATE_WEBSOCKET_MSG',
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
					type: 'UPDATE_EVENT_SOURCE_MSG',
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
export const establishSocket = () => (dispatch, getState) => {
	if (!getState().getSystemInfo.isSocketExist) {
		const load = new Promise((resolve, reject) => {
			const io = socketIo(
				window.location.protocol + '//' + window.location.host
			)
			io.on('message', e => {
				//必须用addEventListener才能监听到
				// updateSystemInfo(e.data)(dispatch, getState)
				// console.log('updateWebsocketMsg', e)
				dispatch({
					type: 'UPDATE_WEBSOCKET_MSG',
					payload: e,
				})
			})
			io.on('connect', function(e) {
				console.log('websocket connect!')
				resolve(io, e)
			})
			io.on('connect_failed', function(e) {
				console.log('websocket connect_failed!')
				reject(e)
			})
			io.on('error', function(e) {
				console.log('websocket connect error!')
				reject(e)
			})
			io.on('reconnecting', function(e) {
				console.log('websocket reconnecting!')
			})
			io.on('disconnect', function(e) {
				console.log('websocket disconnect!')
			})
		})
		return dispatch({
			type: 'ESTABLISH_WEBSOCKET_CONN',
			payload: load,
		})
	} else {
		return getState().getSystemInfo.io
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

		case 'ESTABLISH_WEBSOCKET_CONN_FULFILLED':
			return {
				...state,
				io: action.payload,
			}

		case 'ESTABLISH_EVENT_SOURCE_PENDING': //promise只有pending和resolve reject三种状态
			return {
				...state,
				evtSourceExist: true,
				evtSource: action.payload,
			}
		case 'ESTABLISH_WEBSOCKET_CONN_PENDING': //promise只有pending和resolve reject三种状态
			return {
				...state,
				isSocketExist: true,
				io: action.payload,
			}

		// case 'ESTABLISH_EVENT_SOURCE': //promise只有pending和resolve reject三种状态
		// 	return {
		// 		...state,
		// 		evtSource: action.payload,
		// 	}

		case 'UPDATE_EVENT_SOURCE_MSG': //promise只有pending和resolve reject三种状态
			return {
				...state,
				evtSourceMsg: { ...action.payload },
			}

		case 'UPDATE_WEBSOCKET_MSG': //promise只有pending和resolve reject三种状态
			return {
				...state,
				websocketMsg: { ...action.payload },
			}

		default:
			return {
				...state,
				// name: 'action.payload.message',
			}
	}
}
