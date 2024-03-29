
import React from 'react'
import { connect } from 'react-redux'
import { Room } from '../../Types/Room'
import UIList from '../Shared/UIList/UIList'
import { selectRoom } from '../../Actions/RoomActions'
import './RoomList.css'

interface RoomListInterface {
    availableRooms: Room[]
    selectRoom: (roomId: string) => void
}

class Lobby extends React.Component<RoomListInterface> {
    roomWrapper = (room: Room) => {
        return (
            <div key={room.id} onClick={() => this.props.selectRoom(room.id)} className='room-item'>
                {room.name}
            </div>
        )
    }
    render() {
        return (
            <div className='room-list-container'>
                <div className='room-list-title'>Available Rooms</div>
                <UIList
                    items={this.props.availableRooms.map(room => this.roomWrapper(room))}
                />
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    availableRooms: state.gameManagerReducer.availableRooms
})

const mapDispatchToProps = {
    selectRoom
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lobby)