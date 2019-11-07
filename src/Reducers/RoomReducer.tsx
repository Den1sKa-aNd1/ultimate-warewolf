import { PLAYER_ADDED } from '../Actions/RoomActions'
import { PLAYERS_LOADED } from '../Actions/PlayerActions'
import { Player } from '../Types/Player'
const initialState = {
    roomId: '',
    players: [] as Player[]
}

const roomReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PLAYER_ADDED:
            let newPlayers = state.players
            const newPlayer = new Player(action.player.id, action.player.name, action.roomId)
            newPlayers.push(newPlayer)
            return { ...state, players: newPlayers }
        case PLAYERS_LOADED:
            return { ...state, players: action.players }
        default:
            return state
    }
}

export default roomReducer