import React from 'react'
import { connect } from 'react-redux'
import Button from '../Shared/Button/Button'
import './GameActivity.css'
import { Player } from '../../Types/Player'
import { removeToKill, voteYes } from '../../Actions/GameActivityActions';
interface Interface {
    showActions: boolean
    playerToKill: Player
    removeToKill: () => void
    voteYes: (player: Player) => void
    player: Player
}

const uuid = require('uuid/v1')
let interval = null as any
let killInterval = null as any

class GameActivity extends React.Component<Interface> {
    state = {
        timeLeft: 0,
        timeToKillLeft: 0,
        isNightTime: false
    }
    componentWillUnmount() {
        clearInterval(interval)
        clearInterval(killInterval)
    }
    componentDidMount() {
        const lastActionTime = new Date()
        const nexActionTime = new Date(lastActionTime.getTime() + 10 * 10000);
        interval = setInterval(() => {
            const timeLeft = Math.ceil((nexActionTime.getTime() - new Date().getTime()) / (1000));
            this.setState({ ...this.state, timeLeft })
            if (timeLeft <= 0) {
                this.setState({ ...this.state, isNightTime: true })
                clearInterval(interval)
            }
        }, 1000)
    }

    setKillTimer = () => {
        const lastActionTime = new Date()
        const nexActionTime = new Date(lastActionTime.getTime() + 10 * 1000);
        killInterval = setInterval(() => {
            const timeToKillLeft = Math.ceil((nexActionTime.getTime() - new Date().getTime()) / (1000));
            this.setState({ ...this.state, timeToKillLeft })
            if (timeToKillLeft <= 0) {
                this.props.removeToKill()
                clearInterval(killInterval)
            }
        }, 1000)
    }
    componentWillReceiveProps(nextProps: Interface) {
        if (nextProps.playerToKill.id) {
            this.setKillTimer()
        }
    }
    render() {
        return (
            <div className='game-actions-container'>
                {this.state.timeLeft}
                {this.state.isNightTime &&
                    <Button text='Night Time' onClick={() => { }} />
                }
                {!this.state.isNightTime && this.props.playerToKill.id &&
                    <div><Button text='Yes' onClick={() => { this.props.voteYes(this.props.player) }} /> {this.state.timeToKillLeft} {this.props.playerToKill.name}</div>
                }
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    playerToKill: state.gameActivityReducer.playerToKill,
    player: state.playerReducer.player
})

const mapDispatchToProps = {
    removeToKill,
    voteYes
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameActivity)