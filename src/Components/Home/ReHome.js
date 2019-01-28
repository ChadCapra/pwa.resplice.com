import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactSwipe from 'react-swipe'
import { swiped } from '../../actions'

import ReHeader from '../Header/ReHomeHeader'
import ReContactList from './ReContactList'
import ReGroupList from './ReGroupList'

import './home.scss'

class ReHome extends Component {
  render() {
    return (
      <div className="home">
        <ReHeader />
        <div className="home-body">
          <ReactSwipe
            className="swipe-nav"
            swipeOptions={{
              startSlide: 0,
              continuous: false,
              callback: idx => this.props.swiped(idx)
            }}
          >
            <div
              className="swipe-nav-item-container"
              style={{ transform: 'none' }}
            >
              <ReContactList />
            </div>
            <div className="swipe-nav-item-container">
              <ReGroupList />
            </div>
          </ReactSwipe>
        </div>
      </div>
    )
  }
}

export default withRouter(
  connect(
    null,
    { swiped }
  )(ReHome)
)
