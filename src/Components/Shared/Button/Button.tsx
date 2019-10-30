import React from 'react'
import './Button.css'

interface ButtonProps {
    text: string
    onClick: () => void
}

export default class Button extends React.Component<ButtonProps>{
    render() {
        return (
            <div className='Button' onClick={this.props.onClick}>
                <div>{this.props.text}</div>
            </div>
        )
    }
}