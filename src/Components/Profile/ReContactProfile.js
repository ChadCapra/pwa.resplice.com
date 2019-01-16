import React from 'react'
import MdClose from 'react-ionicons/lib/MdClose'

import SwipeNav from '../Header/SwipeNav'

const ReContactProfile = ({ match }) => {
  return (
    <div>
      <MdClose />
      <SwipeNav menus={['Shares', 'Contact', 'Updates']} />
    </div>
  )
}

export default ReContactProfile
