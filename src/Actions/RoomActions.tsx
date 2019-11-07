
import { putRoom } from '../Components/Fire'
import { changeScreen } from '../Actions/GameManagerActions'
import { Screens } from '../Helpers/Screens'
import { Player } from '../Types/Player'
import { Room } from '../Types/Room'
import { Firebase } from '../Components/Firebase'
import { PlayerRoles } from '../Helpers/PlayerRoles'
export const ROOM_CREATED_WITH_ID = 'ROOM_CREATED_WITH_ID'
export const ROOMS_LOADED = 'ROOMS_LOADED'
export const ROOM_SELECTED = 'ROOM_SELECTED'
export const PLAYER_ADDED = 'PLAYER_ADDED'

const uuid = require('uuid/v1')

export const createRoom = (newRoomName: string) => (dispatch: any) => {
    const newRoom = new Room(uuid(), newRoomName, '')
    putRoom(newRoom)
    dispatch(createdRoom(newRoom.id))
    dispatch(selectRoom(newRoom.id))
}
export const getFromDB = (dataFromDb: any) => (dispatch: any) => {
    let rooms = [] as Room[]
    for (let roomId in dataFromDb) {
        const players = [] as Player[]
        const dbPlayersArray = dataFromDb[roomId].players
        if (dbPlayersArray) {
            for (let playerId in dbPlayersArray) {
                players.push(new Player(dbPlayersArray[playerId].id, dbPlayersArray[playerId].name, dataFromDb[roomId].id))
            }
        }
        const room = new Room(dataFromDb[roomId].id, dataFromDb[roomId].name, dataFromDb[roomId].dbId)
        room.players = players
        rooms.push(room)
    }
    dispatch(roomsLoaded(rooms))
}

export const roomsLoaded = (rooms: any) => {
    return { type: ROOMS_LOADED, rooms }
}

export const createdRoom = (roomId: string) => {
    return { type: ROOM_CREATED_WITH_ID, roomId }
}

export const selectRoom = (roomId: string) => (dispatch: any, getState: any) => {
    const availableRooms = getState().gameManagerReducer.availableRooms as Room[]
    availableRooms.forEach((room: Room) => {
        if (room.id === roomId) {
            const player = getState().playerReducer.player as Player
            player.roomId = roomId
            player.playerRole = PlayerRoles.Villager
            dispatch(roomSelected(room))
            dispatch(changeScreen(Screens.Room))
            Firebase.addPlayerToRoom(room.dbId).push(player)
            dispatch(addPlayer(player, roomId))
        }
    })
}

const roomSelected = (room: Room) => {
    return { type: ROOM_SELECTED, room }
}
export const addPlayer = (player: Player, roomId: string) => (dispatch: any) => {

    dispatch(playerAdded(player, roomId))
}
const playerAdded = (player: Player, roomId: string) => {
    return { type: PLAYER_ADDED, player, roomId }
}