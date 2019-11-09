import React from 'react'
import { connect } from 'react-redux'
import Button from '../Shared/Button/Button'
import { changeScreen } from '../../Actions/GameManagerActions'
import { Screens } from '../../Helpers/Screens'
import PlayersList from '../PlayersList/PlayersList'
import Chat from '../Chat/Chat'
import './GameTable.css'
import { Room } from '../../Types/Room'
interface Interface {
    changeScreen: (screen: Screens) => void
    room: Room
}

class GameTable extends React.Component<Interface> {
    backToLobby = () => {
        this.props.changeScreen(Screens.Lobby)
    }
    addPlayer = () => {
    }
    render() {
        return (
            <div>
                <div><Button text={'Back to lobby'} onClick={() => this.backToLobby()} />
                </div>
                <div>{this.props.room.name}</div>
                <div className='room-activity-container'>
                    <PlayersList roomId={this.props.room.id} roomDbId={this.props.room.dbId} />
                    <Chat />
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    room: state.gameManagerReducer.currentRoom,
})

const mapDispatchToProps = {
    changeScreen,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameTable)