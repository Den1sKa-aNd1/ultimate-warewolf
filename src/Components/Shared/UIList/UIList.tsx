import React from 'react'
import './UIList.css'

interface UIListProps {
    items: any[]
}

export default class UIList extends React.Component<UIListProps>{
    render() {
        return (
            <ul className='uilist'>
                {this.props.items.map(
                    (item:any, i: number) => {
                    return <li key={i} className='listItem'>{item}</li>
                })}
            </ul>
            
        )
    }
}