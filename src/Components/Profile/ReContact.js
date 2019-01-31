import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'
import { swiped } from '../../actions'

import ReContactProfile from './ReContactProfile'
import ReContactShares from './ReContactShares'
import ReContactUpdates from './ReContactUpdates'
import ReHeader from '../Header/ReHeader'

class ReContact extends Component {
  componentWillMount() {
    this.props.swiped(1)
  }

  render() {
    return (
      <div className="contact-container">
        <ReHeader menus={['Share', 'Contact', 'Updates']} />
        <div className="contact-body">
          <ReactSwipe
            className="swipe-nav"
            swipeOptions={{
              startSlide: 1,
              continuous: false,
              callback: idx => this.props.swiped(idx)
            }}
          >
            <div className="swipe-nav-item-container">
              <ReContactShares />
            </div>
            <div className="swipe-nav-item-container">
              <ReContactProfile />
            </div>
            <div className="swipe-nav-item-container">
              <ReContactUpdates />
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
)(ReContact)
