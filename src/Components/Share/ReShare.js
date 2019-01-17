import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'
import { swiped } from '../../actions'

import ReExit from '../Util/ReExit'
import SwipeNav from '../Header/SwipeNav'
import ReShareCamera from './ReShareCamera'
import ReShareList from './ReShareList'
import ReShareCode from './ReShareCode'

import './share.scss'

class ReShare extends Component {
  render() {
    return (
      <div className="share">
        <div className="share-header">
          <ReExit />
          <SwipeNav menus={['QR Code', 'Share', 'Scan']} />
        </div>

        <ReactSwipe
          className="swipe-nav"
          swipeOptions={{
            startSlide: 1,
            continuous: false,
            callback: idx => this.props.swiped(idx)
          }}
        >
          <div className="swipe-nav-item-container">
            <ReShareCode />
          </div>
          <div className="swipe-nav-item-container">
            <ReShareList />
          </div>
          <div className="swipe-nav-item-container">
            <ReShareCamera />
          </div>
        </ReactSwipe>
      </div>
    )
  }
}

export default connect(
  null,
  { swiped }
)(ReShare)
