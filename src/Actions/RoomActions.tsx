
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

export const createRoom = (newRoomName: string, creatorId: string) => (dispatch: any) => {
    const newRoom = new Room(uuid(), newRoomName, '')
    newRoom.creatorId = creatorId
    putRoom(newRoom)
    dispatch(createdRoom(newRoom.id))
    dispatch(selectRoom(newRoom.id))
}
export const getFromDB = (dataFromDb: any) => (dispatch: any) => {
    dispatch(roomsLoaded(dataFromDb))
}

export const roomsLoaded = (rooms: any) => {
    return { type: ROOMS_LOADED, rooms }
}

export const createdRoom = (roomId: string) => {
    return { type: ROOM_CREATED_WITH_ID, roomId }
}

export const selectRoom = (roomId: string) => (dispatch: any, getState: any) => {
    if (!roomId) return
    const player = getState().playerReducer.player as Player
    if (!player.id || !player.name) return
    const availableRooms = getState().gameManagerReducer.availableRooms as Room[]
    availableRooms.forEach((room: Room) => {
        if (room.id === roomId) {
            player.roomId = roomId
            player.playerRole = PlayerRoles.None
            dispatch(roomSelected(room))
            dispatch(changeScreen(Screens.Room))
            if (!room.players.find((p: Player) => p.id === player.id)) {
                Firebase.addPlayerToRoom(room.dbId).push(player)
                dispatch(addPlayer(player, roomId))
            }
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