
import React from 'react'
import { connect } from 'react-redux'
import UIList from '../Shared/UIList/UIList'
import { selectRoom } from '../../Actions/RoomActions'
import './PlayersList.css'
import { Player } from '../../Types/Player'
import { Firebase } from '../Firebase'
import { playersLoaded } from '../../Actions/PlayerActions'

interface PlayersListInterface {
    roomId: string
    roomDbId: string
    playersLoaded: (players: Player[]) => void
}

class PlayersList extends React.Component<PlayersListInterface> {
    state = {
        playersInRoom: [] as Player[]
    }
    componentDidMount() {
        Firebase.players(this.props.roomDbId).on('value', (data: any) => {
            const players = [] as Player[]
            for (let playerId in data.val()) {
                const player = new Player(data.val()[playerId].id, data.val()[playerId].name, data.val()[playerId].roomId)
                players.push(player)
            }
            this.props.playersLoaded(players)
            this.setState({ ...this.state, playersInRoom: players })
        })
    }
    playerWrapper = (player: Player) => {
        return (
            <div key={player.id}>
                {player.name}
            </div>
        )
    }
    render() {
        return (
            <div className='room-list-container'>
                <div className='room-list-title'>Players in a room</div>
                <UIList items={this.state.playersInRoom.map(player => this.playerWrapper(player))} />
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
})

const mapDispatchToProps = {
    selectRoom,
    playersLoaded
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayersList)