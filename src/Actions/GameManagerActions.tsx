import { Screens } from '../Helpers/Screens'
export const CHANGE_SCREEN_TO = 'CHANGE_SCREEN_TO'
export const START_GAME = 'START_GAME'

export const changeScreen = (screen: Screens) => (dispatch: any) => {
    dispatch(changeScreenTo(screen))
}

const changeScreenTo = (screen: Screens) => {
    return { type: CHANGE_SCREEN_TO, screen }
}

export const startGame = () => (dispatch: any) => {
    dispatch(gameStart())
    dispatch(changeScreen(Screens.GameTable))
}
const gameStart = () => {
    return { type: START_GAME }
}