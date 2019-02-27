import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from '../reducers'

const middlewares = [
	thunkMiddleware,
	promiseMiddleware
]

export default createStore(rootReducer, applyMiddleware(...middlewares))
