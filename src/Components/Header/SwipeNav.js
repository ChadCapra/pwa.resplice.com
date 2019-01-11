import React from 'react'
import Columns from 'react-bulma-components/lib/components/columns'

const SwipeNav = ({ menus, active }) => {
  return (
    <Columns breakpoint="mobile" gapless>
      {menus.map((menu, idx) => {
        if (idx === active) {
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

export default SwipeNav
