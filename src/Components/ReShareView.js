import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { swiped } from '../actions'
import ReactSwipe from 'react-swipe'

import ReShareList from './Share/ReShareList'
import ReShareCode from './Share/ReShareCode'
import ReHeader from './Header/ReHeader'

import './Share/share.scss'

const ReShareView = ({ swiped }) => {
  useEffect(() => {
    swiped(0)
  }, [swiped])

  return (
    <div className="share">
      <ReHeader menus={['Share', 'QR Code']} exitRoute={'/'} />
      <div className="share-body">
        <ReactSwipe
          className="swipe-nav"
          swipeOptions={{
            startSlide: 0,
            continuous: false,
            callback: idx => swiped(idx)
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

export default connect(
  null,
  { swiped }
)(ReShareView)
