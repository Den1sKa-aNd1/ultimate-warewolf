
import { Message } from '../Types/Message'
export const MESSAGE_ADDED = 'MESSAGE_ADDED'

const uuid = require('uuid/v1')

export const addMessage = (message: Message) => (dispatch: any) => {
    message.id = uuid()
    dispatch(messageAdded(message))
}
const messageAdded = (message: Message) => {
    return { type: MESSAGE_ADDED, message }
}