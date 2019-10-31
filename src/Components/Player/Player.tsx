import React from 'react'
import { connect } from 'react-redux'
import Button from '../Shared/Button/Button'
import { Player } from '../../Types/Player'
import { setPlayer } from '../../Actions/PlayerActions'
import './Player.css'
interface Interface {
    roomId: string
    setPlayer: (player: Player) => void
}

const uuid = require('uuid/v1')
class PlayerComponent extends React.Component<Interface> {
    state = {
        id: uuid(),
        name: ''
    }
    setPlayer = () => {
        this.props.setPlayer(new Player(this.state.id, this.state.name))
    }
    changeName = (event: any) => {
        this.setState({ ...this.state, name: event.target.value })
    }
    render() {
        return (
            <div className='player-container'>
                <div>My player</div>
                <input type='text' value={this.state.name} onChange={this.changeName} />
                <div><Button text={'Save'} onClick={() => this.setPlayer()} /></div>

            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    roomId: state.gameManagerReducer.currentRoomId,
})

const mapDispatchToProps = {
    setPlayer
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerComponent)