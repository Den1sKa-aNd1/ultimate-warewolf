import React from 'react'
import { connect } from 'react-redux'
import Button from '../Shared/Button/Button'
import { Player } from '../../Types/Player'
import { Message } from '../../Types/Message'
import { addMessage } from '../../Actions/ChatActions'
import './Chat.css'

interface Interface {
    roomId: string
    addMessage: (message: Message) => void
    messages: Message[]
    playersInRoom: Player[]
    currentPlayer: Player
}
class Chat extends React.Component<Interface> {
    state = {
        message: ''
    }
    scrollToBottom = () => {
        if (this.messagesEnd)
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    setMessage = (event: any) => {
        this.setState({ ...this.state, message: event.target.value })
    }
    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    addMessage = () => {
        this.props.addMessage(new Message('1', this.props.roomId, this.props.currentPlayer.id, this.state.message, ''))
        this.setState({ ...this.state, message: '' })
    }
    messagesEnd: HTMLDivElement | null | undefined
    render() {
        return (
            <div className='room-container'>
                <div>Chat</div>
                <div className='chat-area' >{this.props.messages.map((message: Message) => {
                    const playerName = this.props.playersInRoom.filter((player: Player) => player.id === message.playerId)[0].name
                    return <div key={message.id} className='chat-message'>{playerName}: {message.text}</div>
                })}
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}></div>
                </div>
                <div><input type='text' value={this.state.message} onChange={this.setMessage} /></div>
                <div><Button text={'Add Message'}
                    onClick={() => this.addMessage()} /></div>

            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    currentPlayer: state.playerReducer.player,
    roomId: state.gameManagerReducer.currentRoomId,
    messages: state.chatReducer.messages,
    playersInRoom: state.roomReducer.players.filter((player: Player) => player.roomId === state.gameManagerReducer.currentRoomId)
})

const mapDispatchToProps = {
    addMessage
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)