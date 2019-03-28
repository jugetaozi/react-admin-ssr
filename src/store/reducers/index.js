import { combineReducers } from 'redux'
import userReducer from './userReducer'
import getUserInfoReducer from './getUserInfoReducer'

const rootReducer = combineReducers({
	// userReducer,
	getUserInfoReducer,
})

export default rootReducer
