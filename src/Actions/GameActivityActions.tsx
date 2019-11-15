
import { Player } from '../Types/Player'
import { killPlayer } from '../Actions/GameManagerActions'
import { Firebase } from '../Components/Firebase'
import { Room } from '../Types/Room'
export const NOMINATE_TO_KILL = 'NOMINATE_TO_KILL'
export const REMOVE_TO_KILL = 'REMOVE_TO_KILL'
export const VOTE_YES = 'VOTE_YES'

export const nominateToKill = (player: Player) => (dispatch: any, getState: any) => {
    const currentRoom = getState().gameManagerReducer.currentRoom as Room
    Firebase.playerToKill(currentRoom.dbId).set(player)
    dispatch(playerToKill(player))
}

const playerToKill = (player: Player) => {
    return { type: NOMINATE_TO_KILL, player }
}
export const removeToKill = () => (dispatch: any, getState: any) => {
    const currentRoom = getState().gameManagerReducer.currentRoom as Room
    const player = getState().gameActivityReducer.playerToKill
    dispatch(killPlayer(player))
    dispatch(resetToKill(currentRoom.dbId))

}
const resetToKill = (roomDbId: string) => {
    Firebase.playerToKill(roomDbId).remove()
    Firebase.vote(roomDbId).remove()
    return { type: REMOVE_TO_KILL }
}
export const voteYes = (player: Player) => (dispatch: any) => {
    dispatch(yesVote(player))
}
const yesVote = (player: Player) => {
    return { type: VOTE_YES, player }
}

export const setGameTimer = (timeInSeconds: number) => (dispatch: any, getState: any) => {
    const roomId = getState().roomReducer.room.dbId
    Firebase.gameTimer(roomId).set(timeInSeconds)
}
export const setToKillTimer = (timeInSeconds: number) => (dispatch: any, getState: any) => {
    const roomId = getState().roomReducer.room.dbId
    Firebase.timeToKillLeft(roomId).set(timeInSeconds)
}
export const vote = (player: Player) => (dispatch: any, getState: any) => {
    const roomId = getState().roomReducer.room.dbId
    Firebase.vote(roomId).push(player)
}