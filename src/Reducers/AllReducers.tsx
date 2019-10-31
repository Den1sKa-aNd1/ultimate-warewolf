import { combineReducers } from 'redux'
import baseReducer from './BaseReducer'
import gameManagerReducer from './GameManagerReducer'
import roomReducer from './RoomReducer'
import chatReducer from './ChatReducer'
import playerReducer from './PlayerReducer'

const reducers = combineReducers({
    baseReducer,
    gameManagerReducer,
    roomReducer,
    chatReducer,
    playerReducer
})

export default reducers