import { Screens } from '../Helpers/Screens'
export const CHANGE_SCREEN_TO = 'CHANGE_SCREEN_TO'

export const changeScreen = (screen: Screens) => (dispatch: any) => {
    dispatch(changeScreenTo(screen))
}

export const changeScreenTo = (screen: Screens) => {
    return { type: CHANGE_SCREEN_TO, screen }
}
