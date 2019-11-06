import {
    PLAYER_ADDED,
} from '../Actions/RoomActions'
import { Player } from '../Types/Player'
const initialState = {
    roomId: '',
    players: [
        new Player('123', 'name 1'),
        new Player('124', 'name 2', '1'),
        new Player('125', 'name 3', '1'),
        new Player('126', 'name 4', '2')
    ]
}

const roomReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PLAYER_ADDED:
            let newPlayers = state.players
            newPlayers.push(action.player)
            return { ...state, players: newPlayers }
        default:
            return state
    }
}

export default roomReducer