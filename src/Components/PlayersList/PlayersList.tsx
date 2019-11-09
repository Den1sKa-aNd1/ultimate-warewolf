
import React from 'react'
import { connect } from 'react-redux'
import UIList from '../Shared/UIList/UIList'
import { selectRoom } from '../../Actions/RoomActions'
import './PlayersList.css'
import { Player } from '../../Types/Player'
import { Firebase } from '../Firebase'
import { playersLoaded } from '../../Actions/PlayerActions'
import { PlayerRoles } from '../../Helpers/PlayerRoles'

const wwIcon = require('../../Icons/werewolf.png')
const deadIcon = require('../../Icons/dead.png')
const seerIcon = require('../../Icons/seer.png')
const hunterIcon = require('../../Icons/hunter.png')

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
        const isWarewolf = this.props.currentPlayer.playerRole === PlayerRoles.Warewolf
            && this.props.gameStatus && player.playerRole === PlayerRoles.Warewolf
        const isDead = true
        const isHunter = this.props.gameStatus && this.props.currentPlayer.playerRole === PlayerRoles.Hunter
        const isSeer = this.props.gameStatus && this.props.currentPlayer.playerRole === PlayerRoles.Seer

        return (
            <div key={player.id} className='player-item'>
                <div className='player-name'>
                    {player.name}
                </div>
                <div className='player-icon'>
                    {isWarewolf ? <img src={wwIcon} className='player-icon-image' alt={''} /> : null}
                    {isHunter ? <img src={hunterIcon} className='player-icon-image' alt={''} /> : null}
                    {isSeer ? <img src={seerIcon} className='player-icon-image' alt={''} /> : null}
                    {isDead ? <img src={deadIcon} className='player-icon-image' alt={''} /> : null}
                </div>
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