import React from 'react'
import { connect } from 'react-redux'
import Button from '../Shared/Button/Button'
import { Player } from '../../Types/Player'
import { setPlayer } from '../../Actions/PlayerActions'
import './Player.css'
interface Interface {
    roomId: string
    setPlayer: (player: Player) => void
    player: Player
    showActions: boolean
}

const uuid = require('uuid/v1')
class PlayerComponent extends React.Component<Interface> {
    state = {
        id: uuid(),
        name: ''
    }
    componentDidMount() {
        if (this.props.player && this.props.player.id) {
            this.setState({ ...this.state, id: this.props.player.id, name: this.props.player.name })
        }
    }
    setPlayer = () => {
        if (this.state.name)
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
                {this.props.showActions && <div><Button text={'Save'} onClick={() => this.setPlayer()} /></div>}
                <div className='player-role'>Player role: {this.props.player.playerRole}</div>
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    roomId: state.gameManagerReducer.currentRoomId,
    player: state.playerReducer.player
})

const mapDispatchToProps = {
    setPlayer
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerComponent)