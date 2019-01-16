import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'
import { swiped, fetch_my_attributes } from '../../actions'

import ReExit from '../Util/ReExit'
import SwipeNav from '../Header/SwipeNav'
import ReUserProfile from './ReUserProfile'
import ReUserUpdates from './ReUserUpdates'
import ReUserSettings from './ReUserSettings'

import './profile.scss'

class ReUser extends Component {
  constructor(props) {
    super(props)
    this.swipe = React.createRef()
  }

  componentWillMount() {
    this.props.fetch_my_attributes()
  }

  render() {
    return (
      <div className="user">
        <div className="user-header">
          <ReExit />
          <SwipeNav menus={['Settings', 'Updates', 'Profile']} />
        </div>

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
          </div>
        </ReactSwipe>
      </div>
    )
  }
}

export default connect(
  null,
  { swiped, fetch_my_attributes }
)(ReUser)
