import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'

import { swiped } from '../../state/actions'

import ReShareAttributes from '../Share/ReShareAttributes'
import ReInvite from '../Share/ReInvite'
import ReHeader from '../Header/ReHeader'

import './Share/share.scss'

const ReShareView = ({ swiped }) => {
  useEffect(() => {
    swiped(0)
  }, [swiped])

  return (
    <div className="view">
      <ReHeader menus={['Invite', 'Shares']} exitRoute={'/'} />
      <div className="view-body">
        <ReactSwipe
          className="swipe-nav"
          swipeOptions={{
            startSlide: 0,
            continuous: false,
            callback: idx => swiped(idx)
          }}
        >
          <div className="swipe-item-container">
            <ReInvite />
          </div>
          <div className="swipe-item-container">
            <ReShareAttributes />
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
