import React from 'react'

import Columns from 'react-bulma-components/lib/components/columns'
import ReExit from '../Util/ReExit'
import SwipeNav from './SwipeNav'

import './header.scss'

const ReHeader = ({ children, menus, active, exitRoute }) => {
  return (
    <div className="re-header">
      <Columns breakpoint="mobile" gapless style={{ marginBottom: '9px' }}>
        <Columns.Column>{children}</Columns.Column>
        <Columns.Column className="icon-right" size={2}>
          <ReExit exitRoute={exitRoute} />
        </Columns.Column>
      </Columns>
      <SwipeNav menus={menus} active={active} />
    </div>
  )
}

export default ReHeader
