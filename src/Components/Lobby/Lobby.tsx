
import React from 'react'
import { connect } from 'react-redux'
import { createRoom } from '../../Actions/RoomActions'
import Button from '../Shared/Button/Button'
import RoomsList from '../RoomsList/RoomsList'
import PlayerComponent from '../Player/Player'
interface LobbyInterface {
    currentRoomId: string
    createRoom: () => void
}

class Lobby extends React.Component<LobbyInterface> {
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <PlayerComponent />
                <RoomsList />
                <div>
                    <Button
                        text={'Create Room'}
                        onClick={() => this.props.createRoom()}
                    />
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    currentRoomId: state.gameManagerReducer.currentRoomId
})

const mapDispatchToProps = {
    createRoom,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lobby)