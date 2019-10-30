
import React from 'react'
import { connect } from 'react-redux'
import UIList from '../Shared/UIList/UIList'
import { selectRoom } from '../../Actions/RoomActions'
import './PlayersList.css'
import { Player } from '../../Types/Player'

interface PlayersListInterface {
    playersInRoom: Player[]
    roomId: string
}

class PlayersList extends React.Component<PlayersListInterface> {
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
                <UIList
                    items={this.props.playersInRoom.map(player => this.playerWrapper(player))}
                />
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    playersInRoom: state.roomReducer.players.filter((player: Player) => player.roomId === state.gameManagerReducer.currentRoomId)
})

const mapDispatchToProps = {
    selectRoom
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayersList)