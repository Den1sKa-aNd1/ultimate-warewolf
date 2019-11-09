import { PLAYER_ADDED, ROOM_SELECTED } from '../Actions/RoomActions'
import { PLAYERS_LOADED } from '../Actions/PlayerActions'
import { START_GAME, ROLES_SET } from '../Actions/GameManagerActions'
import { Player } from '../Types/Player'
import { Room } from '../Types/Room'
const initialState = {
    room: new Room('', '', ''),
    gameStatus: 'notStarted'
}

const roomReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PLAYER_ADDED:
            let newPlayers = state.room.players
            const newPlayer = new Player(action.player.id, action.player.name, action.roomId)
            newPlayers.push(newPlayer)
            const room = state.room
            room.players = newPlayers
            return { ...state, room }
        case PLAYERS_LOADED:
            const roomP = state.room
            roomP.players = action.players
            return { ...state, room: roomP }
        case START_GAME:
            return { ...state, gameStatus: 'started' }
        case ROOM_SELECTED:
            return { ...state, room: action.room }
        case ROLES_SET:
            const roomR = state.room
            roomR.players = action.players
            return { ...state, room: roomR }
        default:
            return state
    }
}

export default roomReducer