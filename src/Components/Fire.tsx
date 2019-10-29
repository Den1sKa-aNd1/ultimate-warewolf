import firebase from '../Helpers/Firebase/FirebaseClient'

export const getByPath = (path: string) => {
    const result = [] as any[]
    const ref = firebase.database().ref(path)
    ref.on('value', (data) => {
        result.push(data)
        console.log(data.val())
    })
    return result
}