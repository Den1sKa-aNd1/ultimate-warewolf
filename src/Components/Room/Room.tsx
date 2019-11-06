import React from 'react'
import { connect } from 'react-redux'
import Button from '../Shared/Button/Button'
import { startGame, changeScreen } from '../../Actions/GameManagerActions'
import { Screens } from '../../Helpers/Screens'
import PlayersList from '../PlayersList/PlayersList'
import { Player } from '../../Types/Player'
import { addPlayer } from '../../Actions/RoomActions'
import Chat from '../Chat/Chat'
import './Room.css'
import { Room } from '../../Types/Room'
interface RoomInterface {
    changeScreen: (screen: Screens) => void
    room: Room
    addPlayer: (player: Player) => void
    startGame: () => void
}

class RoomComponent extends React.Component<RoomInterface> {
    backToLobby = () => {
        this.props.changeScreen(Screens.Lobby)
    }
    addPlayer = () => {
        this.props.addPlayer(new Player('1', 'test', this.props.room.id))
    }
    startGame = () => {
        this.props.startGame()
    }
    render() {
        return (
            <div>
                <div><Button text={'Back to lobby'}
                    onClick={() => this.backToLobby()} />
                </div>
                <div>{this.props.room.name}</div>
                <div className='room-activity-container'>
                    <PlayersList roomId={this.props.room.id} />
                    <Chat />
                </div>
                <div><Button text={'Add player'}
                    onClick={() => this.addPlayer()} /></div>
                <div><Button text={'Start'}
                    onClick={() => this.startGame()} /></div>
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    room: state.gameManagerReducer.currentRoom
})

const mapDispatchToProps = {
    startGame,
    addPlayer,
    changeScreen
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomComponent)