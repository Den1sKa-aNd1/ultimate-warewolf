import React from 'react'
import { connect } from 'react-redux'
import Button from '../Shared/Button/Button'
import { changeScreen } from '../../Actions/GameManagerActions'
import { Screens } from '../../Helpers/Screens'
import PlayersList from '../PlayersList/PlayersList'
import { Player } from '../../Types/Player'
import Chat from '../Chat/Chat'
import './GameTable.css'
interface Interface {
    changeScreen: (screen: Screens) => void
    roomId: string
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
                <div><Button text={'Back to lobby'}
                    onClick={() => this.backToLobby()} />
                </div>
                <div>Room name</div>
                <div className='room-activity-container'>
                    <PlayersList roomId={this.props.roomId} />
                    <Chat />
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    roomId: state.gameManagerReducer.currentRoomId
})

const mapDispatchToProps = {
    changeScreen,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameTable)