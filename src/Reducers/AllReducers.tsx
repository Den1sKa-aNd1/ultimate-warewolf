import { combineReducers } from 'redux'
import baseReducer from './BaseReducer'
import gameManagerReducer from './GameManagerReducer'

const reducers = combineReducers({
    baseReducer,
    gameManagerReducer
})

export default reducers