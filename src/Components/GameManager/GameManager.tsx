import React from 'react'
import { connect } from 'react-redux'
import { changeScreenTo } from '../../Actions/GameManagerActions'
import Lobby from '../Lobby/Lobby'
import { Screens } from '../../Helpers/Screens'
import Room from '../Room/Room'

interface GameManagerInterface {
    currentScreen: Screens
    currentRoomId: string
    changeScreenTo: (screen: Screens) => void
}

export class GameManager extends React.Component<GameManagerInterface> {
    componentDidMount() {
        this.props.changeScreenTo(Screens.Lobby)
    }
    componentWillReceiveProps(nextProps: any) {
    }
    render() {
        switch (this.props.currentScreen) {
            case Screens.Lobby: return <Lobby />
            case Screens.Room: return <Room />
        }
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    currentScreen: state.gameManagerReducer.currentScreen,
    currentRoomId: state.gameManagerReducer.currentRoomId
})

const mapDispatchToProps = {
    changeScreenTo
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameManager)