import React, { Component } from 'react'
import ReactSwipe from 'react-swipe'

import ReHeader from '../Header/ReHeader'
import ReContactList from './ReContactList'
import ReGroupList from './ReGroupList'
import ReShareFAB from '../ShareFAB/ReShareFAB'
import './home.scss'

class ReHome extends Component {
  render() {
    return (
      <div className="home">
        <ReHeader />
        <div className="home-body">
          <ReactSwipe
            className="swipe-nav"
            swipeOptions={{ startSlide: 0, continuous: false }}
          >
            <div>
              <ReContactList />
            </div>
            <div>
              <ReGroupList />
            </div>
          </ReactSwipe>
          <ReShareFAB selected={false} />
        </div>
      </div>
    )
  }
}

export default ReHome
