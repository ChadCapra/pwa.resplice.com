import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'
import { swiped } from '../../state/actions'

import ReUserProfile from '../User/ReUserProfile'
import ReUserSettings from '../User/ReUserSettings'
import RePlusFAB from '../Button/RePlusFAB'
import ReHeader from '../Header/ReHeader'
import ReAddAttribute from '../Profile/ReAddAttribute'
import ReModal from '../Modal/ReModal'

import './Profile/profile.scss'
import './User/user.scss'

const ReUserView = ({ swiped }) => {
  const [showAddAttributeModal, setAddAttributeModal] = useState(false)
  let reactSwipeEl = useRef(null)

  useEffect(() => {
    swiped(0)
  }, [swiped])

  const handleNavClick = action => {
    if (action === 'next') reactSwipeEl.current.swipe.next()
    else reactSwipeEl.current.swipe.prev()
  }

  return (
    <div className="view">
      <ReHeader
        menus={['Profile', 'Settings']}
        exitRoute={'/'}
        handleNavClick={handleNavClick}
      />
      <div className="view-body">
        <ReactSwipe
          swipeOptions={{
            startSlide: 0,
            continuous: false,
            callback: idx => swiped(idx)
          }}
          ref={reactSwipeEl}
        >
          <div className="swipe-item-container">
            <ReUserProfile />
            <RePlusFAB onClick={() => setAddAttributeModal(true)} />
          </div>
          <div className="swipe-item-container">
            <ReUserSettings />
          </div>
        </ReactSwipe>
      </div>

      <ReModal
        full
        show={showAddAttributeModal}
        onClose={() => setAddAttributeModal(false)}
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
