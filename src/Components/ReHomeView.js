import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { swiped } from '../state/actions'
import ReactSwipe from 'react-swipe'

import ReHomeHeader from './Header/ReHomeHeader'
import ReGroupList from './Group/ReGroupList'
import ReContactList from './Contact/ReContactList'

import './views.scss'

const ReHomeView = ({ swiped }) => {
  const reactSwipeEl = useRef(null)

  useEffect(() => {
    swiped(0)
  }, [swiped])

  const handleNavClick = action => {
    if (action === 'next') reactSwipeEl.current.swipe.next()
    else reactSwipeEl.current.swipe.prev()
  }

  return (
    <div className="view">
      <ReHomeHeader handleNavClick={handleNavClick} />
      <div className="view-body">
        <ReactSwipe
          swipeOptions={{
            continuous: false,
            callback: idx => swiped(idx)
          }}
          ref={reactSwipeEl}
        >
          <div className="swipe-item-container" style={{ overflow: 'hidden' }}>
            <ReGroupList />
          </div>
          <div className="swipe-item-container" style={{ overflow: 'hidden' }}>
            <ReContactList />
          </div>
        </ReactSwipe>
      </div>
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
