import {
    SET_PLAYER
} from '../Actions/PlayerActions'
import { ROOM_SELECTED_WITH_ID } from '../Actions/RoomActions'
import { Player } from '../Types/Player'
const initialState = {
    player: new Player('', '', '')
}

const playerReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_PLAYER:
            return { ...state, player: action.player }
        case ROOM_SELECTED_WITH_ID:
            const currentPlayer = state.player
            currentPlayer.roomId = action.roomId
            return { ...state, player: currentPlayer }
        default:
            return state
    }
}

export default playerReducer