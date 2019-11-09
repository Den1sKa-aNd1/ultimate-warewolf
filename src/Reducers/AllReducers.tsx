import { combineReducers } from 'redux'
import gameManagerReducer from './GameManagerReducer'
import roomReducer from './RoomReducer'
import chatReducer from './ChatReducer'
import playerReducer from './PlayerReducer'
import gameActivityReducer from './GameActivityReducer'

const reducers = combineReducers({
    gameManagerReducer,
    roomReducer,
    chatReducer,
    playerReducer,
    gameActivityReducer
})

export default reducers