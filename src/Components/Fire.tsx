import firebase from '../Helpers/Firebase/FirebaseClient'
import { Room } from '../Types/Room'

export const getByPath = (path: string) => {
    let result = [] as any[]
    const ref = firebase.database().ref(path)
    ref.on('value', (data) => {
        result = [] as any[]
        for (let room in data.val()) {
            result.push(new Room(room, data.val()[room].name, room))
        }
        return result
    })
}

export function getRooms(): any {
    firebase.database().ref('/room')
        .on('value', (data) => {
            console.log(data.val())
            return data.val()
        })
}

export const putInPath = (path: string, obj: any) => {
    const ref = firebase.database().ref(path)
    ref.push(obj)
}

export const putRoom = (room: Room) => {
    const ref = firebase.database().ref('/room')
    ref.push({
        id: room.id,
        name: room.name
    })
}