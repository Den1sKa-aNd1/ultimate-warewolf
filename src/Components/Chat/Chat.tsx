import React from 'react'
import { connect } from 'react-redux'
import Button from '../Shared/Button/Button'
import { Player } from '../../Types/Player'
import { Message } from '../../Types/Message'
import { addMessage, messagesLoaded } from '../../Actions/ChatActions'
import './Chat.css'
import { Firebase } from '../Firebase'
import { Room } from '../../Types/Room'

interface Interface {
    room: Room
    addMessage: (message: Message) => void
    messages: Message[]
    playersInRoom: Player[]
    currentPlayer: Player
    messagesLoaded: (messages: Message[]) => void
}
const uuid = require('uuid/v1')

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
        Firebase.messages(this.props.room.dbId).on('value', (data: any) => {
            const messages = [] as Message[]
            for (let messageId in data.val()) {
                const message =
                    new Message(data.val()[messageId].id, this.props.room.dbId, data.val()[messageId].playerId,
                        data.val()[messageId].text, data.val()[messageId].time)
                messages.push(message)
            }
            this.props.messagesLoaded(messages)
            this.setState({ ...this.state, messages })
        })

        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    addMessage = () => {
        this.props.addMessage(new Message(uuid(), this.props.room.dbId, this.props.currentPlayer.id, this.state.message, ''))
        this.setState({ ...this.state, message: '' })
    }
    messagesEnd: HTMLDivElement | null | undefined
    render() {
        return (
            <div className='room-container'>
                <div>Chat</div>
                <div className='chat-area' >{this.props.messages.map((message: Message) => {
                    let playerName = ''
                    this.props.playersInRoom.filter((player: Player) => player.id === message.playerId)
                        .map(p => { playerName = p.name })
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
    room: state.gameManagerReducer.currentRoom,
    messages: state.chatReducer.messages,
    playersInRoom: state.roomReducer.players.filter((player: Player) => player.roomId === state.gameManagerReducer.currentRoom.id)
})

const mapDispatchToProps = {
    addMessage,
    messagesLoaded
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)