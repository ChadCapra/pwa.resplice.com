import React from 'react'
import { connect } from 'react-redux'
import Columns from 'react-bulma-components/lib/components/columns'

const SwipeNav = ({ menus, swipeIndex, handleNavClick }) => {
  return (
    <Columns breakpoint="mobile" gapless className="swipe-nav-container">
      {menus.map((menu, idx) => {
        return (
          <Columns.Column
            key={idx}
            className="swipe-nav-item"
            onClick={() => {
              if (idx > swipeIndex) handleNavClick('next')
              else if (idx < swipeIndex) handleNavClick('prev')
            }}
          >
            <div>{menu}</div>
            <div
              className={`swipe-nav-${
                idx === swipeIndex ? 'active' : 'inactive'
              }`}
            />
          </Columns.Column>
        )
      })}
    </Columns>
  )
}

const mapStateToProps = state => {
  return { swipeIndex: state.utilState.swipeIndex }
}

export default connect(mapStateToProps)(SwipeNav)
