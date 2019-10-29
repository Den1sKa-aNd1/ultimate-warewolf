import React from 'react'
import { getByPath } from '../Fire'
import { connect } from 'react-redux'
import { showPopup, putObjects } from '../../Actions/BaseActions'

interface RoomInterface {
    showPopup: () => void
    putObjects: (obj: any) => void
}

export class FirebaseApp extends React.Component<RoomInterface> {
    componentDidMount() {
        this.props.putObjects(getByPath('room'))
        this.props.showPopup()
    }
    render() {
        return (
            <div>
                <div>Room name</div>
                <div>users</div>
            </div>
        )
    }

}
const mapStateToProps = (state: any, ownProps: any) => ({
})

const mapDispatchToProps = {
    showPopup,
    putObjects
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FirebaseApp)