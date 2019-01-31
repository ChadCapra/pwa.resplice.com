import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'
import { swiped } from '../../actions'

import ReUserProfile from './ReUserProfile'
import ReUserUpdates from './ReUserUpdates'
import ReUserSettings from './ReUserSettings'
import RePlusFAB from '../Buttons/RePlusFAB'
import ReHeader from '../Header/ReHeader'

import './profile.scss'

class ReUser extends Component {
  constructor(props) {
    super(props)
    this.swipe = React.createRef()
  }

  componentWillMount() {
    this.props.swiped(1)
  }

  render() {
    return (
      <div className="user">
        <ReHeader menus={['Settings', 'Updates', 'Profile']} />
        <div className="user-body">
          <ReactSwipe
            className="swipe-nav"
            swipeOptions={{
              startSlide: 1,
              continuous: false,
              callback: idx => this.props.swiped(idx)
            }}
            ref={this.swipe}
          >
            <div className="swipe-nav-item-container">
              <ReUserSettings />
            </div>
            <div className="swipe-nav-item-container">
              <ReUserUpdates />
            </div>
            <div className="swipe-nav-item-container">
              <ReUserProfile />
              <RePlusFAB route="/profile/add-attribute" />
            </div>
          </ReactSwipe>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { swiped }
)(ReUser)
