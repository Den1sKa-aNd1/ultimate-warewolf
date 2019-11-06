import {
    CHANGE_SCREEN_TO,
} from '../Actions/GameManagerActions'
import { ROOM_CREATED_WITH_ID, ROOM_SELECTED, ROOMS_LOADED } from '../Actions/RoomActions'

import { Screens } from '../Helpers/Screens'
import { Room } from '../Types/Room'

const initialState = {
    currentScreen: Screens.Lobby,
    currentRoom: new Room('', '', ''),
    availableRooms: [
    ] as Room[]
}

const gameManagerReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case CHANGE_SCREEN_TO:
            return { ...state, currentScreen: action.screen }
        case ROOM_CREATED_WITH_ID:
        case ROOM_SELECTED:
            return { ...state, currentRoom: action.room }
        case ROOMS_LOADED:
            return { ...state, availableRooms: action.rooms }
        default:
            return state
    }
}

export default gameManagerReducer