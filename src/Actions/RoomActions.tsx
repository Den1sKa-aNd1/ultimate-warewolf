
import { putInPath } from '../Components/Fire'
import { changeScreenTo } from '../Actions/GameManagerActions'
import { Screens } from '../Helpers/Screens'

export const ROOM_CREATED_WITH_ID = 'ROOM_CREATED_WITH_ID'

const uuid = require('uuid/v1')

export const createRoom = () => (dispatch: any) => {
    console.log('called')
    const newRoomId = uuid()
    putInPath('room', newRoomId, roomCreated)
    dispatch(createdRoom(newRoomId))
    dispatch(changeScreenTo(Screens.Room))
}

export const roomCreated = (result: any) => {
    console.log('created')
    createdRoom(result)
}

export const createdRoom = (roomId: string) => {
    console.log('disp:', roomId)
    return { type: ROOM_CREATED_WITH_ID, roomId }
}