import { Screens } from '../Helpers/Screens'
import { Player } from '../Types/Player'
import { PlayerRoles } from '../Helpers/PlayerRoles'
import { Firebase } from '../Components/Firebase'
import { Room } from '../Types/Room'
export const CHANGE_SCREEN_TO = 'CHANGE_SCREEN_TO'
export const START_GAME = 'START_GAME'
export const ROLES_SET = 'ROLES_SET'
export const PLAYER_GOT_KILLED = 'PLAYER_GOT_KILLED'
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS'


export const changeScreen = (screen: Screens) => (dispatch: any) => {
    dispatch(changeScreenTo(screen))
}

const changeScreenTo = (screen: Screens) => {
    return { type: CHANGE_SCREEN_TO, screen }
}

export const startGame = () => (dispatch: any) => {
    dispatch(gameStart())
    dispatch(changeScreen(Screens.GameTable))
}
const gameStart = () => {
    return { type: START_GAME }
}

export const setPlayersRoles = () => (dispatch: any, getState: any) => {
    const players = getState().roomReducer.room.players as Player[]
    const roomDbId = getState().gameManagerReducer.currentRoom.dbId
    dispatch(rolesSet(setRoles(players, roomDbId)))
}
export const rolesSet = (players: Player[]) => {
    return { type: ROLES_SET, players }
}
const getRandomNumber = (maxValue: number) => {
    return Math.round(Math.random() * (maxValue - 1))
}
const isTherePlayerWithNoRole = (players: Player[]) => {
    let result = false
    players.map((player: Player) => {
        if (!result) {
            if (player.playerRole === PlayerRoles.None) {
                result = true
            }
        }
    })
    return result
}
const removeRoles = (players: Player[]) => {
    for (let id in players) {
        players[id].playerRole = PlayerRoles.None
    }
    return players
}
const setRoles = (players: Player[], roomDbId: string) => {
    const playersCount = players.length
    const warewoolfsTotalNumber = Math.round(playersCount * 0.2)
    let thereArePlayersWithNoRole = true

    let seerIsSet = false
    let hunterIsSet = false
    let bodyGuardIsSet = false
    if (playersCount > 0) {
        players = removeRoles(players)
        let warewoolfsNumber = 0
        while (thereArePlayersWithNoRole) {
            const selectedNumber = getRandomNumber(playersCount)
            if (warewoolfsNumber < warewoolfsTotalNumber) {
                if (players[selectedNumber].playerRole === PlayerRoles.None) {
                    players[selectedNumber].playerRole = PlayerRoles.Warewolf
                    warewoolfsNumber++
                }
            } else {
                if (!seerIsSet) {
                    if (players[selectedNumber].playerRole === PlayerRoles.None) {
                        players[selectedNumber].playerRole = PlayerRoles.Seer
                        seerIsSet = true
                    }
                }
                if (!hunterIsSet) {
                    if (players[selectedNumber].playerRole === PlayerRoles.None) {
                        players[selectedNumber].playerRole = PlayerRoles.Hunter
                        hunterIsSet = true
                    }
                }
                if (!bodyGuardIsSet) {
                    if (players[selectedNumber].playerRole === PlayerRoles.None) {
                        players[selectedNumber].playerRole = PlayerRoles.Bodyguard
                        bodyGuardIsSet = true
                    }
                }
                if (seerIsSet && hunterIsSet && bodyGuardIsSet) {
                    if (players[selectedNumber].playerRole === PlayerRoles.None) {
                        players[selectedNumber].playerRole = PlayerRoles.Villager
                    }
                }
            }
            if (!isTherePlayerWithNoRole(players)) {
                thereArePlayersWithNoRole = false
            }
        }
    }
    updateDb(players, roomDbId)
    return players
}

const updateDb = (players: Player[], roomDbId: string) => {
    Firebase.players(roomDbId).remove()
    Firebase.players(roomDbId).update(players)
}

export const killPlayer = (player: Player) => (dispatch: any, getState: any) => {
    const currentRoom = getState().gameManagerReducer.currentRoom as Room
    const votedPlayers = getState().gameActivityReducer.votedPlayers as Player[]
    const alivePlayers = votedPlayers.filter((player: Player) => player.isDead !== true)
    if (alivePlayers.length > currentRoom.players.length / 2 || votedPlayers.length > 0) {
        for (let id in currentRoom.players) {
            if (currentRoom.players[id].id === player.id) {
                currentRoom.players[id].isDead = true
            }
        }
        updateDb(currentRoom.players, currentRoom.dbId)
        dispatch(playerGotKilled(player))
        dispatch(updatePlayers(currentRoom.players))
    }
}
const playerGotKilled = (player: Player) => {
    return { type: PLAYER_GOT_KILLED, player }
}
const updatePlayers = (players: Player[]) => {
    return { type: UPDATE_PLAYERS, players }
}