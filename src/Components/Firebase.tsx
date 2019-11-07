import firebase from '../Helpers/Firebase/FirebaseClient'

export class Firebase {
    static room: any = firebase.database().ref('/room')
    static selectedRoom = () => firebase.database().ref('/room/')
    static players = (roomDbId: string) => firebase.database().ref('/room/' + roomDbId + '/players')
    static addPlayerToRoom = (roomDbId: string) => firebase.database().ref('/room/' + roomDbId + '/players')
    static messages = (roomDbId: string) => firebase.database().ref('/room/' + roomDbId + '/messages')
    static addMessageToRoom = (roomDbId: string) => firebase.database().ref('/room/' + roomDbId + '/messages')
}