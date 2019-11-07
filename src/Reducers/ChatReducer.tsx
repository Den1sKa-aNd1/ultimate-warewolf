import {
    MESSAGE_ADDED, MESSAGES_LOADED
} from '../Actions/ChatActions'
import { Message } from '../Types/Message'
const initialState = {
    roomId: '',
    messages: [] as Message[]
}

const chatReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case MESSAGES_LOADED:
            return { ...state, messages: action.messages }
        default:
            return state
    }
}

export default chatReducer