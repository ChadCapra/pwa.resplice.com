import React from 'react'
import MdClose from 'react-ionicons/lib/MdClose'

import SwipeNav from '../Header/SwipeNav'

const ReContactProfile = ({ match }) => {
  return (
    <div>
      <MdClose />
      <SwipeNav menus={['Shares', 'Contact', 'Updates']} active={1} />
    </div>
  )
}

export default ReContactProfile
