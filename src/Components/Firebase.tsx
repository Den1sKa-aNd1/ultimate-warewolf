import firebase from '../Helpers/Firebase/FirebaseClient'

export class Firebase {
    static room: any = firebase.database().ref('/room')
    static selectedRoom = () => firebase.database().ref('/room/')
    static players = (roomDbId: string) => firebase.database().ref('/room/' + roomDbId + '/players')
    static addPlayerToRoom = (roomDbId: string) => firebase.database().ref('/room/' + roomDbId + '/players')
    static messages = (roomDbId: string) => firebase.database().ref('/room/' + roomDbId + '/messages')
    static addMessageToRoom = (roomDbId: string) => firebase.database().ref('/room/' + roomDbId + '/messages')
    static gameTimer = (roomDbId: string) => firebase.database().ref('/room/' + roomDbId + '/gameTimer')
    static timeToKillLeft = (roomDbId: string) => firebase.database().ref('/room/' + roomDbId + '/timeToKillLeft')
    static playerToKill = (roomDbId: string) => firebase.database().ref('/room/' + roomDbId + '/playerToKill')
    static vote = (roomDbId: string) => firebase.database().ref('/room/' + roomDbId + '/vote')
}