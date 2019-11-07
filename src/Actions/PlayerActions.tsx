
import { Player } from '../Types/Player'
export const SET_PLAYER = 'SET_PLAYER'
export const PLAYERS_LOADED = 'PLAYERS_LOADED'

export const setPlayer = (player: Player) => (dispatch: any) => {
    dispatch(playerSet(player))
}
const playerSet = (player: Player) => {
    return { type: SET_PLAYER, player }
}

export const playersLoaded = (players: Player[]) => (dispatch: any) => {
    dispatch(loadedPlayers(players))
}
const loadedPlayers = (players: Player[]) => {
    return { type: PLAYERS_LOADED, players }
}