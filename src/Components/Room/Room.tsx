import React from 'react'
import { connect } from 'react-redux'
import Button from '../Shared/Button/Button'
import {changeScreen} from '../../Actions/GameManagerActions'
import { Screens } from '../../Helpers/Screens'

interface RoomInterface {
    changeScreen: (screen: Screens) => void
}

class RoomComponent extends React.Component<RoomInterface> {
    backToLobby = () => {
        this.props.changeScreen(Screens.Lobby)
    }
    render() {
        return (
            <div>
                <div><Button text={'Back to lobby'}
                onClick={() => this.backToLobby()}/></div>
                <div>Room name</div>
                <div>users</div>
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
})

const mapDispatchToProps = {
    changeScreen
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomComponent)