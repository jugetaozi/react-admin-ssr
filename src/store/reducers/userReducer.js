// import { postLoginCode } from "../action/userReducer";
import { getList } from 'api/keyword'
const { delay } = require('../../utils/utils')
const init_state = {
	name: 'wudi',
}
export default function reducer(state = init_state, action) {
	console.log('userReducerDispatchAction', action)
	switch (action.type) {
		default:
			return {
				...state,
				// name: 'action.payload.message',
			}
	}
}
