import React from 'react'
import { connect } from 'react-redux'
import Columns from 'react-bulma-components/lib/components/columns'

const SwipeNav = ({ menus, activeIndex }) => {
  return (
    <Columns breakpoint="mobile" gapless>
      {menus.map((menu, idx) => {
        if (idx === activeIndex) {
          return (
            <Columns.Column key={idx} className="swipe-nav-item">
              <div>{menu}</div>
              <div className="swipe-nav-active" />
            </Columns.Column>
          )
        } else {
          return (
            <Columns.Column key={idx} className="swipe-nav-item">
              <div>{menu}</div>
              <div className="swipe-nav-inactive" />
            </Columns.Column>
          )
        }
      })}
    </Columns>
  )
}

const mapStateToProps = state => {
  return { activeIndex: state.utils.swipeIndex }
}

export default connect(mapStateToProps)(SwipeNav)
