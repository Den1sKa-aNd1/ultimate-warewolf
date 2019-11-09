import React from 'react'
import { connect } from 'react-redux'
import { createRoom, getFromDB } from '../../Actions/RoomActions'
import Button from '../Shared/Button/Button'
import RoomsList from '../RoomsList/RoomsList'
import PlayerComponent from '../Player/Player'
import { Room } from '../../Types/Room'
import { Firebase } from '../Firebase'
import { Player } from '../../Types/Player'
import './Lobby.css'

interface LobbyInterface {
    currentRoomId: string
    createRoom: (newRoomName: string, creatorId: string) => void
    getFromDB: (rooms: Room[]) => void
    currentPlayer: Player
}

class Lobby extends React.Component<LobbyInterface> {
    state = {
        newRoomName: ''
    }
    componentDidMount() {
        Firebase.room.on('value', (data: any) => {
            const rooms = [] as Room[]
            for (let roomDbId in data.val()) {
                const room = new Room(data.val()[roomDbId].id, data.val()[roomDbId].name, roomDbId)
                room.creatorId = data.val()[roomDbId].creatorId
                const dbPlayersArray = data.val()[roomDbId].players
                if (dbPlayersArray) {
                    const players = [] as Player[]
                    for (let playerId in dbPlayersArray) {
                        players.push(new Player(dbPlayersArray[playerId].id, dbPlayersArray[playerId].name, data.val()[roomDbId].id))
                    }
                    room.players = players
                }
                rooms.push(room)
            }
            this.props.getFromDB(rooms)
        })
    }
    componentWillUnmount() {
        Firebase.room.off()
    }
    changeRoomName = (event: any) => {
        this.setState({ ...this.state, newRoomName: event.target.value })
    }
    createRoom = () => {
        this.props.createRoom(this.state.newRoomName, this.props.currentPlayer.id)
        this.setState({ ...this.state, newRoomName: '' })
    }
    render() {
        return (
            <div className='lobby-container'>
                <PlayerComponent />
                <RoomsList />
                <div>
                    <input type='text' value={this.state.newRoomName} onChange={this.changeRoomName} />
                    <Button
                        text={'Create Room'}
                        onClick={() => this.createRoom()}
                    />
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    currentRoomId: state.gameManagerReducer.currentRoomId,
    currentPlayer: state.playerReducer.player
})

const mapDispatchToProps = {
    createRoom,
    getFromDB
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lobby)