import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { swiped } from '../state/actions'
import { Redirect } from 'react-router-dom'
import ReactSwipe from 'react-swipe'

import ReHomeHeader from './Header/ReHomeHeader'
import ReProfileList from './Profile/ReProfileList'
import ReCreateGroup from './Group/ReCreateGroup'
import RePlusFAB from './Button/RePlusFAB'
import ReModal from './Modal/ReModal'

import './views.scss'

const ReHomeView = ({ groups, contacts, swiped }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [toShare, setToShare] = useState(false)
  const [groupSelecting, setGroupSelecting] = useState(false)
  const [contactSelecting, setContactSelecting] = useState(false)
  const reactSwipeEl = useRef(null)

  useEffect(() => {
    swiped(0)
  }, [swiped])

  const handleNavClick = action => {
    if (action === 'next') reactSwipeEl.current.swipe.next()
    else reactSwipeEl.current.swipe.prev()
  }

  if (toShare) return <Redirect push to="/share" />

  return (
    <div className="view">
      <ReHomeHeader handleNavClick={handleNavClick} />
      <div className="view-body">
        <ReactSwipe
          swipeOptions={{
            startSlide: 0,
            continuous: false,
            callback: idx => swiped(idx)
          }}
          ref={reactSwipeEl}
        >
          <div className="swipe-item-container" style={{ overflow: 'hidden' }}>
            <ReProfileList
              listType="groups"
              onSelecting={() => setGroupSelecting(true)}
            />
            {!groupSelecting && (
              <RePlusFAB onClick={() => setShowCreateModal(true)} />
            )}
          </div>
          <div className="swipe-item-container" style={{ overflow: 'hidden' }}>
            <ReProfileList
              listType="contacts"
              onSelecting={() => setContactSelecting(true)}
            />
            {!contactSelecting && (
              <RePlusFAB onClick={() => setToShare(true)} />
            )}
          </div>
        </ReactSwipe>
      </div>

      <ReModal
        full
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        headerText="Create Group"
      >
        <ReCreateGroup />
      </ReModal>
    </div>
  )
}

ReHomeView.propTypes = {
  swiped: PropTypes.func.isRequired
}

export default connect(
  null,
  { swiped }
)(ReHomeView)
