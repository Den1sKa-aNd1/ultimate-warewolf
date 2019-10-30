import {
    CHANGE_SCREEN_TO,
} from '../Actions/GameManagerActions'
import { ROOM_CREATED_WITH_ID, ROOM_SELECTED_WITH_ID } from '../Actions/RoomActions'

import { Screens } from '../Helpers/Screens'
import { Room } from '../Types/Rooms'

const initialState = {
    currentScreen: Screens.Lobby,
    currentRoomId: '' as string,
    availableRooms: [
        new Room('1', 'name 1'),
        new Room('2', 'name 2'),
        new Room('3', 'name 3')
    ] as Room[]
}

const gameManagerReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case CHANGE_SCREEN_TO:
            return { ...state, currentScreen: action.screen }
        case ROOM_CREATED_WITH_ID:
        case ROOM_SELECTED_WITH_ID:
            return { ...state, currentRoomId: action.roomId }
        default:
            return state
    }
}

export default gameManagerReducer