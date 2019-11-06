
import { putRoom, getRooms } from '../Components/Fire'
import { changeScreen } from '../Actions/GameManagerActions'
import { Screens } from '../Helpers/Screens'
import { Player } from '../Types/Player'
import { Room } from '../Types/Room'
import { Firebase } from '../Components/Firebase'
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
        rooms.push(new Room(dataFromDb[roomId].id, dataFromDb[roomId].name, roomId))
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
    console.log('roomID', roomId)
    Firebase.selectedRoom().once('value', data => {
        for (let roomDbId in data.val()) {
            if (data.val()[roomDbId].id === roomId) {
                dispatch(roomSelected(data.val()[roomDbId]))
                dispatch(changeScreen(Screens.Room))
            }
        }
    })
}

const roomSelected = (room: Room) => {
    return { type: ROOM_SELECTED, room }
}
export const addPlayer = (player: Player) => (dispatch: any) => {
    dispatch(playerAdded(player))
}
const playerAdded = (player: Player) => {
    return { type: PLAYER_ADDED, player }
}