import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'
import { swiped } from '../../actions'

import ReShareCamera from './ReShareCamera'
import ReShareList from './ReShareList'
import ReShareCode from './ReShareCode'
import ReHeader from '../Header/ReHeader'

import './share.scss'

class ReShare extends Component {
  render() {
    return (
      <div className="share">
        <ReHeader menus={['QR Code', 'Updates', 'Profile']} />
        <div className="share-body">
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
      </div>
    )
  }
}

export default connect(
  null,
  { swiped }
)(ReShare)
