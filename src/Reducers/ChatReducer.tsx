import {
    MESSAGE_ADDED
} from '../Actions/ChatActions'
import { Message } from '../Types/Message'
const initialState = {
    roomId: '',
    messages: [
        new Message('123', '1', '125', 'text message 1', ''),
        new Message('124', '1', '124', 'text message 2', ''),
        new Message('125', '1', '124', 'text message 3', ''),
        new Message('126', '1', '125', 'text message 4', '')
    ]
}

const chatReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case MESSAGE_ADDED:
            let newMessages = state.messages
            newMessages.push(action.message)
            return { ...state, messages: newMessages }
        default:
            return state
    }
}

export default chatReducer