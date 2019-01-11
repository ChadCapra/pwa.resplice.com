import React, { Component } from 'react'
import ReactSwipe from 'react-swipe'

import ReExit from '../Util/ReExit'
import SwipeNav from '../Header/SwipeNav'
import ReUserProfile from './ReUserProfile'
import ReUserUpdates from './ReUserUpdates'
import ReUserSettings from './ReUserSettings'

import './profile.scss'

export default class ReUser extends Component {
  constructor(props) {
    super(props)
    this.swipe = React.createRef()
  }

  onSlideChange(idx) {}

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
            startSlide: 2,
            continuous: false,
            callback: idx => this.onSlideChange(idx)
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
