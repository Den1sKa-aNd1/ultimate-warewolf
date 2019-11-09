
import React from 'react'
import { connect } from 'react-redux'
import UIList from '../Shared/UIList/UIList'
import { selectRoom } from '../../Actions/RoomActions'
import './PlayersList.css'
import { Player } from '../../Types/Player'
import { Firebase } from '../Firebase'
import { playersLoaded } from '../../Actions/PlayerActions'
import { PlayerRoles } from '../../Helpers/PlayerRoles'

interface PlayersListInterface {
    roomId: string
    roomDbId: string
    playersLoaded: (players: Player[]) => void
    gameStatus: boolean
    currentPlayer: Player
}

class PlayersList extends React.Component<PlayersListInterface> {
    state = {
        playersInRoom: [] as Player[]
    }
    componentDidMount() {
        Firebase.players(this.props.roomDbId).on('value', (data: any) => {
            const players = [] as Player[]
            for (let playerId in data.val()) {
                const player = new Player(data.val()[playerId].id, data.val()[playerId].name, data.val()[playerId].roomId, data.val()[playerId].playerRole)
                players.push(player)
            }
            this.props.playersLoaded(players)
            this.setState({ ...this.state, playersInRoom: players })
        })
    }
    playerWrapper = (player: Player) => {
        const isPlayerWarewoolf = this.props.currentPlayer.playerRole === PlayerRoles.Warewolf
        return (
            <div key={player.id}>
                {player.name} {this.props.gameStatus && isPlayerWarewoolf && player.playerRole === PlayerRoles.Warewolf ? player.playerRole : ''}
            </div>
        )
    }
    render() {
        return (
            <div className='player-list-container'>
                <div className='player-list-title'>Players in a room</div>
                <div className='players-list-area'>
                    <UIList items={this.state.playersInRoom.map(player => this.playerWrapper(player))} />
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    gameStatus: state.roomReducer.gameStatus === 'started',
    currentPlayer: state.playerReducer.player
})

const mapDispatchToProps = {
    selectRoom,
    playersLoaded
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayersList)