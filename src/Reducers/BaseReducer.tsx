import {
    SHOW_POPUP,
    PUT_OBJECTS
} from '../Actions/BaseActions'

const initialState = {
    showPopup: false,
    objectsToRender: null
}

const popupReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case SHOW_POPUP:
            return { ...state, showPopup: !state.showPopup }
        case PUT_OBJECTS:
            return { ...state, objectsToRender: action.objectsToRender }
        default:
            return state
    }
}

export default popupReducer