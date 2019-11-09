import { SET_PLAYER } from '../Actions/PlayerActions'
import { ROOM_SELECTED } from '../Actions/RoomActions'
import { ROLES_SET } from '../Actions/GameManagerActions'
import { Player } from '../Types/Player'
const initialState = {
    player: new Player('', '')
}

const playerReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_PLAYER:
            return { ...state, player: action.player }
        case ROOM_SELECTED:
            const currentPlayer = state.player
            currentPlayer.roomId = action.room.id
            return { ...state, player: currentPlayer }
        case ROLES_SET:
            let setPlayer = new Player('', '')
            action.players.map((p: Player) => {
                if (p.id === state.player.id) {
                    setPlayer = p
                }
            })
            return { ...state, player: setPlayer }

        default:
            return state
    }
}

export default playerReducer