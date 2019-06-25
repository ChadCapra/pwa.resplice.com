import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { swiped } from '../actions'
import ReactSwipe from 'react-swipe'

import ReHomeHeader from './Header/ReHomeHeader'
import ReGroupList from './Group/ReGroupList'
import ReContactList from './Contact/ReContactList'

import './views.scss'

const ReHomeView = ({ swiped }) => {
  useEffect(() => {
    swiped(0)
  }, [swiped])

  return (
    <div className="home">
      <ReHomeHeader />
      <div className="home-body">
        <ReactSwipe
          className="swipe-nav"
          swipeOptions={{
            startSlide: 0,
            continuous: false,
            callback: idx => swiped(idx)
          }}
        >
          <div className="swipe-nav-item-container">
            <ReGroupList />
          </div>
          <div className="swipe-nav-item-container">
            <ReContactList />
          </div>
        </ReactSwipe>
      </div>
    </div>
  )
}

export default connect(
  null,
  { swiped }
)(ReHomeView)
