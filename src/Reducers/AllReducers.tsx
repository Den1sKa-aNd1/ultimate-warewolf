import { combineReducers } from 'redux'
import baseReducer from './BaseReducer'
import gameManagerReducer from './GameManagerReducer'
import roomReducer from './RoomReducer'

const reducers = combineReducers({
    baseReducer,
    gameManagerReducer,
    roomReducer
})

export default reducers