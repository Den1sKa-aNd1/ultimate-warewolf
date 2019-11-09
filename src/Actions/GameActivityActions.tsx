
import { Player } from '../Types/Player'
import { killPlayer } from '../Actions/GameManagerActions'
export const NOMINATE_TO_KILL = 'NOMINATE_TO_KILL'
export const REMOVE_TO_KILL = 'REMOVE_TO_KILL'
export const VOTE_YES = 'VOTE_YES'

export const nominateToKill = (player: Player) => (dispatch: any) => {
    dispatch(playerToKill(player))
}

const playerToKill = (player: Player) => {
    return { type: NOMINATE_TO_KILL, player }
}
export const removeToKill = () => (dispatch: any, getState: any) => {
    const player = getState().gameActivityReducer.playerToKill
    dispatch(killPlayer(player))
    dispatch(resetToKill())
}
const resetToKill = () => {
    return { type: REMOVE_TO_KILL }
}
export const voteYes = (player: Player) => (dispatch: any) => {
    dispatch(yesVote(player))
}
const yesVote = (player: Player) => {
    return { type: VOTE_YES, player }
}

