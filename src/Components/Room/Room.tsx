import React from 'react'
import { connect } from 'react-redux'
import Button from '../Shared/Button/Button'
import { startGame, changeScreen, setPlayersRoles } from '../../Actions/GameManagerActions'
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
    addPlayer: (player: Player, roomId: string) => void
    startGame: () => void
    currentPlayers: Player[]
    setPlayersRoles: () => void
    player: Player
}

class RoomComponent extends React.Component<RoomInterface> {
    backToLobby = () => {
        this.props.changeScreen(Screens.Lobby)
    }
    startGame = () => {
        this.props.setPlayersRoles()
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
                    <PlayersList roomId={this.props.room.id} roomDbId={this.props.room.dbId} />
                    <Chat />
                </div>
                {this.props.player.id === this.props.room.creatorId &&
                    <div><Button text={'Start'}
                        onClick={() => this.startGame()} /></div>
                }
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    room: state.gameManagerReducer.currentRoom,
    currentPlayers: state.roomReducer.room.players.filter((p: Player) => p.roomId === state.gameManagerReducer.currentRoom.id),
    player: state.playerReducer.player
})

const mapDispatchToProps = {
    startGame,
    addPlayer,
    changeScreen,
    setPlayersRoles
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomComponent)