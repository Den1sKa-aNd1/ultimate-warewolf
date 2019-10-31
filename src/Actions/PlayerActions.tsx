
import { Player } from '../Types/Player'
import { addPlayer } from '../Actions/RoomActions'
export const SET_PLAYER = 'SET_PLAYER'

export const setPlayer = (player: Player) => (dispatch: any) => {
    dispatch(playerSet(player))
    dispatch(addPlayer(player))
}
const playerSet = (player: Player) => {
    return { type: SET_PLAYER, player }
}