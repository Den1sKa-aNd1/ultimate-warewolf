import React from 'react'
import { connect } from 'react-redux'
import Button from '../Shared/Button/Button'
import { changeScreen } from '../../Actions/GameManagerActions'
import { Screens } from '../../Helpers/Screens'
import PlayersList from '../PlayersList/PlayersList'
import { Player } from '../../Types/Player'
import { addPlayer } from '../../Actions/RoomActions'
interface RoomInterface {
    changeScreen: (screen: Screens) => void
    roomId: string
    addPlayer: (player: Player) => void
}

class RoomComponent extends React.Component<RoomInterface> {
    backToLobby = () => {
        this.props.changeScreen(Screens.Lobby)
    }
    addPlayer = () => {
        this.props.addPlayer(new Player('1', 'test', this.props.roomId))
    }
    render() {
        return (
            <div>
                <div><Button text={'Back to lobby'}
                    onClick={() => this.backToLobby()} /></div>
                <div>Room name</div>
                <div><PlayersList roomId={this.props.roomId} /></div>
                <div><Button text={'Add player'}
                    onClick={() => this.addPlayer()} /></div>
                <div><Button text={'Start'}
                    onClick={() => this.addPlayer()} /></div>
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    roomId: state.gameManagerReducer.currentRoomId
})

const mapDispatchToProps = {
    changeScreen,
    addPlayer
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomComponent)