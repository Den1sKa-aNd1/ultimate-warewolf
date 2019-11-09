import {
    CHANGE_SCREEN_TO,
} from '../Actions/GameManagerActions'
import { ROOM_CREATED_WITH_ID, ROOM_SELECTED, ROOMS_LOADED } from '../Actions/RoomActions'
import { PLAYER_GOT_KILLED, UPDATE_PLAYERS } from '../Actions/GameManagerActions'

import { Screens } from '../Helpers/Screens'
import { Room } from '../Types/Room'
import { Player } from '../Types/Player'

const initialState = {
    currentScreen: Screens.Lobby,
    currentRoom: new Room('', '', ''),
    availableRooms: [] as Room[]
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
        case PLAYER_GOT_KILLED:
            return { ...state }
        case UPDATE_PLAYERS:
            const currentRoom = state.currentRoom
            currentRoom.players = action.players
            return { ...state, currentRoom }
        default:
            return state
    }
}

export default gameManagerReducer