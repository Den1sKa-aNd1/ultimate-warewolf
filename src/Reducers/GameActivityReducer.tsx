import { Player } from '../Types/Player'
import { NOMINATE_TO_KILL, REMOVE_TO_KILL, VOTE_YES } from '../Actions/GameActivityActions'

const initialState = {
    playerToKill: new Player('', '', ''),
    votedPlayers: [] as Player[]
}

const gameActivityReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case NOMINATE_TO_KILL:
            if (!state.playerToKill.id)
                return { ...state, playerToKill: action.player }
        case REMOVE_TO_KILL:
            return { ...state, playerToKill: new Player('', '', ''), votedPlayers: [] }
        case VOTE_YES:
            const votedPlayers = state.votedPlayers
            let newVote = true
            if (votedPlayers.map((vp: Player) => {
                if (newVote) {
                    if (vp.id === action.player.id) {
                        newVote = false
                    }
                }
            }))
                if (newVote) {
                    votedPlayers.push(action.player)
                }
            return { ...state, votedPlayers }
        default:
            return state
    }
}

export default gameActivityReducer