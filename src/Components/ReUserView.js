import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'
import { swiped } from '../actions'

import ReUserProfile from './Profile/ReUserProfile'
import ReUserSettings from './Profile/ReUserSettings'
import RePlusFAB from './Buttons/RePlusFAB'
import ReHeader from './Header/ReHeader'
import ReAddAttribute from './Profile/ReAddAttribute'
import ReModal from './Modals/ReModal'

import './Profile/profile.scss'

const ReUserView = ({ swiped }) => {
  const [showAddAttributeModal, setAddAttributeModal] = useState(false)

  useEffect(() => {
    swiped(0)
  }, [swiped])

  return (
    <div className="user">
      <ReHeader menus={['Profile', 'Settings']} exitRoute={'/'} />
      <div className="user-body">
        <ReactSwipe
          className="swipe-nav"
          swipeOptions={{
            startSlide: 0,
            continuous: false,
            callback: idx => swiped(idx)
          }}
        >
          <div className="swipe-nav-item-container">
            <ReUserProfile />
            <RePlusFAB onClick={() => setAddAttributeModal(true)} />
          </div>
          <div className="swipe-nav-item-container">
            <ReUserSettings />
          </div>
        </ReactSwipe>
      </div>

      <ReModal
        show={showAddAttributeModal}
        onClose={() => setAddAttributeModal(false)}
        full
      >
        <ReAddAttribute onAttributeAdd={() => setAddAttributeModal(false)} />
      </ReModal>
    </div>
  )
}

export default connect(
  null,
  { swiped }
)(ReUserView)
