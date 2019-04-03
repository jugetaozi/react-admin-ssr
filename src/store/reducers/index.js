import { combineReducers } from 'redux'
import getSystemInfo from './getSystemInfo'
import getUserInfoReducer from './getUserInfoReducer'

const rootReducer = combineReducers({
	getSystemInfo,
	getUserInfoReducer,
})

export default rootReducer
