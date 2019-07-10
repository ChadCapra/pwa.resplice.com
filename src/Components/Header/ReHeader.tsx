import React, { FC } from 'react'

import Columns from 'react-bulma-components/lib/components/columns'
import ReExit from '../Util/ReExit'
import SwipeNav from './SwipeNav'

import './header.scss'

interface Props {
  children?: any
  menus: string[]
  exitRoute: string
  handleNavClick?: Callback
}

const ReHeader: FC<Props> = ({
  children,
  menus,
  exitRoute,
  handleNavClick
}) => {
  return (
    <div className="re-header">
      <Columns breakpoint="mobile" gapless style={{ marginBottom: '9px' }}>
        <Columns.Column>{children}</Columns.Column>
        <Columns.Column className="icon-right" size={2}>
          <ReExit exitRoute={exitRoute} />
        </Columns.Column>
      </Columns>
      <SwipeNav menus={menus} handleNavClick={handleNavClick} />
    </div>
  )
}

export default ReHeader
