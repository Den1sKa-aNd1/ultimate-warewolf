
import React from 'react'
import { connect } from 'react-redux'
import { createRoom, createdRoom } from '../../Actions/RoomActions'
import Button from '../Shared/Button'

interface LobbyInterface {
    currentRoomId: string

    createRoom: () => void
    createdRoom: (roomId: string) => void
}


export class Lobby extends React.Component<LobbyInterface> {
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <div>
                    <Button
                        text={'Join Room'}
                        onClick={() => { }}
                    />
                </div>
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
    createdRoom
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lobby)