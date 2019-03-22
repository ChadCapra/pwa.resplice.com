import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'
import { swiped } from '../actions'

import ReShareList from './Share/ReShareList'
import ReShareCode from './Share/ReShareCode'
import ReHeader from './Header/ReHeader'

import './Share/share.scss'

class ReShareView extends Component {
  componentWillMount() {
    this.props.swiped(0)
  }

  render() {
    return (
      <div className="share">
        <ReHeader menus={['Share', 'QR Code']} />
        <div className="share-body">
          <ReactSwipe
            className="swipe-nav"
            swipeOptions={{
              startSlide: 0,
              continuous: false,
              callback: idx => this.props.swiped(idx)
            }}
          >
            <div className="swipe-nav-item-container">
              <ReShareList />
            </div>
            <div className="swipe-nav-item-container">
              <ReShareCode />
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
)(ReShareView)
