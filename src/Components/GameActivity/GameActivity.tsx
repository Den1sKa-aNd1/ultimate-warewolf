import React from 'react'
import { connect } from 'react-redux'
import Button from '../Shared/Button/Button'
import './GameActivity.css'
import { Player } from '../../Types/Player'
import { removeToKill, voteYes, setGameTimer, setToKillTimer, vote } from '../../Actions/GameActivityActions'
import { Firebase } from '../Firebase'
import { Room } from '../../Types/Room'
interface Interface {
    showActions: boolean
    removeToKill: () => void
    voteYes: (player: Player) => void
    vote: (player: Player) => void
    player: Player
    room: Room
    setGameTimer: (timeInSeconds: number) => void
    setToKillTimer: (timeInSeconds: number) => void
    playerToKill: Player
}

let interval = null as any
let killInterval = null as any

class GameActivity extends React.Component<Interface> {
    state = {
        timeLeft: 0,
        timeToKillLeft: 0,
        isNightTime: false,
        playerToKill: new Player('', '')
    }
    componentWillUnmount() {
        clearInterval(interval)
        clearInterval(killInterval)
    }
    componentDidMount() {
        if (this.props.room.creatorId === this.props.player.id || this.props.player.name === 'timer1') {
            const lastActionTime = new Date()
            const nexActionTime = new Date(lastActionTime.getTime() + 10 * 10000);
            interval = setInterval(() => {
                const timeLeft = Math.ceil((nexActionTime.getTime() - new Date().getTime()) / (1000));
                this.props.setGameTimer(timeLeft)
                if (timeLeft <= 0) {
                    this.setState({ ...this.state, isNightTime: true })
                    clearInterval(interval)
                }
            }, 1000)
            Firebase.vote(this.props.room.dbId).on('value', data => {
                for (let playerId in data.val()) {
                    this.props.voteYes(data.val()[playerId])
                }
            })
        }
        Firebase.gameTimer(this.props.room.dbId).on('value', data => {
            this.setState({ ...this.state, timeLeft: data.val() })
        })
        Firebase.timeToKillLeft(this.props.room.dbId).on('value', data => {
            this.setState({ ...this.state, timeToKillLeft: data.val() })
        })
        Firebase.playerToKill(this.props.room.dbId).on('value', data => {
            this.setState({ ...this.state, playerToKill: data.val() })
            if (this.props.room.creatorId === this.props.player.id || this.props.player.name === 'timer1') {
                if (data.val() && data.val().id) {
                    this.setKillTimer()
                }
            }
        })
    }

    setKillTimer = () => {
        const lastActionTime = new Date()
        const nexActionTime = new Date(lastActionTime.getTime() + 10 * 1000);
        killInterval = setInterval(() => {
            const timeToKillLeft = Math.ceil((nexActionTime.getTime() - new Date().getTime()) / (1000));
            this.props.setToKillTimer(timeToKillLeft)
            if (timeToKillLeft <= 0) {
                this.props.removeToKill()
                clearInterval(killInterval)
            }
        }, 1000)
    }
    vote(player: Player) {
        this.props.voteYes(player)
        this.props.vote(player)
    }
    render() {
        return (
            <div className='game-actions-container'>
                {this.state.timeLeft}
                {this.state.isNightTime &&
                    <Button text='Night Time' onClick={() => { }} />
                }
                {!this.state.isNightTime && this.state.playerToKill && this.state.playerToKill.id &&
                    <div><Button text='Yes' onClick={() => { this.vote(this.props.player) }} /> {this.state.timeToKillLeft} {this.state.playerToKill.name}</div>
                }
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    playerToKill: state.gameActivityReducer.playerToKill,
    player: state.playerReducer.player,
    room: state.roomReducer.room
})

const mapDispatchToProps = {
    removeToKill,
    voteYes,
    setGameTimer,
    setToKillTimer,
    vote
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameActivity)