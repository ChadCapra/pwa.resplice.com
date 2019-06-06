import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'
import { swiped } from '../actions'

import ReUserProfile from './Profile/ReUserProfile'
import ReUserSettings from './Profile/ReUserSettings'
import RePlusFAB from './Buttons/RePlusFAB'
import ReHeader from './Header/ReHeader'
import ReAddAttribute from './Profile/ReAddAttribute'
import ReModal from './Modals/ReModal'

import './Profile/profile.scss'

class ReUserView extends Component {
  constructor(props) {
    super(props)
    this.swipe = React.createRef()
    this.state = {
      showAddAttributeModal: false
    }
  }

  componentWillMount() {
    this.props.swiped(0)
  }

  render() {
    return (
      <div className="user">
        <ReHeader menus={['Profile', 'Settings']} exitRoute={'/'} />
        <div className="user-body">
          <ReactSwipe
            className="swipe-nav"
            swipeOptions={{
              startSlide: 0,
              continuous: false,
              callback: idx => this.props.swiped(idx)
            }}
            ref={this.swipe}
          >
            <div className="swipe-nav-item-container">
              <ReUserProfile />
              <RePlusFAB
                onClick={() => this.setState({ showAddAttributeModal: true })}
              />
            </div>
            <div className="swipe-nav-item-container">
              <ReUserSettings />
            </div>
          </ReactSwipe>
        </div>

        <ReModal
          show={this.state.showAddAttributeModal}
          onClose={() => this.setState({ showAddAttributeModal: false })}
          full
        >
          <ReAddAttribute
            onAttributeAdd={() =>
              this.setState({ showAddAttributeModal: false })
            }
          />
        </ReModal>
      </div>
    )
  }
}

export default connect(
  null,
  { swiped }
)(ReUserView)
