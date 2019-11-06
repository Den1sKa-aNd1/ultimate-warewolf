import firebase from '../Helpers/Firebase/FirebaseClient'

export class Firebase {
    static room: any = firebase.database().ref('/room')
    static selectedRoom = () => firebase.database().ref('/room/')
}