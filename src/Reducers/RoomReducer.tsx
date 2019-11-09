import { PLAYER_ADDED } from '../Actions/RoomActions'
import { PLAYERS_LOADED } from '../Actions/PlayerActions'
import { START_GAME, ROLES_SET } from '../Actions/GameManagerActions'
import { Player } from '../Types/Player'
const initialState = {
    roomId: '',
    players: [] as Player[],
    gameStatus: 'notStarted'
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
        case START_GAME:
            return { ...state, gameStatus: 'started' }
        case ROLES_SET:
            return { ...state, players: action.players }
        default:
            return state
    }
}

export default roomReducer