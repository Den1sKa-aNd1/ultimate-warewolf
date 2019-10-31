import React from 'react'
import { connect } from 'react-redux'
import { changeScreen } from '../../Actions/GameManagerActions'
import Lobby from '../Lobby/Lobby'
import { Screens } from '../../Helpers/Screens'
import Room from '../Room/Room'
import GameTable from '../GameTable/GameTable'

interface GameManagerInterface {
    currentScreen: Screens
    currentRoomId: string
    changeScreen: (screen: Screens) => void
}

export class GameManager extends React.Component<GameManagerInterface> {
    componentDidMount() {
        this.props.changeScreen(Screens.Lobby)
    }
    componentWillReceiveProps(nextProps: any) {
    }
    render() {
        switch (this.props.currentScreen) {
            case Screens.Lobby: return <Lobby />
            case Screens.Room: return <Room />
            case Screens.GameTable: return <GameTable />
            default: return <Lobby />
        }
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    currentScreen: state.gameManagerReducer.currentScreen,
    currentRoomId: state.gameManagerReducer.currentRoomId
})

const mapDispatchToProps = {
    changeScreen
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameManager)