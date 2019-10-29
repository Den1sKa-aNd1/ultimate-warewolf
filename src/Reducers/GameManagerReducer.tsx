import {
    CHANGE_SCREEN_TO,
} from '../Actions/GameManagerActions'
import { ROOM_CREATED_WITH_ID } from '../Actions/RoomActions'

import { Screens } from '../Helpers/Screens'

const initialState = {
    currentScreen: Screens.Lobby,
    currentRoomId: '' as string
}

const gameManagerReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case CHANGE_SCREEN_TO:
            return { ...state, currentScreen: action.screen }
        case ROOM_CREATED_WITH_ID:
            return { ...state, currentRoomId: action.roomId }
        default:
            return state
    }
}

export default gameManagerReducer