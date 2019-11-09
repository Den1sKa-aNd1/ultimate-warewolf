import { Screens } from '../Helpers/Screens'
import { Player } from '../Types/Player'
import { PlayerRoles } from '../Helpers/PlayerRoles'
import { Firebase } from '../Components/Firebase'
export const CHANGE_SCREEN_TO = 'CHANGE_SCREEN_TO'
export const START_GAME = 'START_GAME'
export const ROLES_SET = 'ROLES_SET'

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
    const players = getState().roomReducer.players as Player[]
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
const setRoles = (players: Player[], roomDbId: string) => {
    const playersCount = players.length
    const warewoolfsTotalNumber = Math.round(playersCount * 0.3)
    let thereArePlayersWithNoRole = true

    let seerIsSet = false
    let hunterIsSet = false
    let bodyGuardIsSet = false
    if (playersCount > 0) {
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