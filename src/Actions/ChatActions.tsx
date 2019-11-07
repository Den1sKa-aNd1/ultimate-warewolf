
import { Message } from '../Types/Message'
import { Firebase } from '../Components/Firebase'
export const MESSAGE_ADDED = 'MESSAGE_ADDED'
export const MESSAGES_LOADED = 'MESSAGES_LOADED'

export const addMessage = (message: Message) => (dispatch: any) => {
    console.log(message)
    Firebase.addMessageToRoom(message.roomDbId).push(message)
    dispatch(messageAdded(message))
}
const messageAdded = (message: Message) => {
    return { type: MESSAGE_ADDED, message }
}

export const messagesLoaded = (messages: Message[]) => (dispatch: any) => {
    dispatch(loadedMessages(messages))
}
const loadedMessages = (messages: Message[]) => {
    return { type: MESSAGES_LOADED, messages }
}