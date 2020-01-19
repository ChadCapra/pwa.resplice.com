import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import UserView from './views/UserView'

const Sandbox = () => {
  // return (
  //   <div
  //     style={{
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       width: '100%',
  //       height: '100%',
  //       padding: '1.5em',
  //       overflow: 'hidden',
  //       boxSizing: 'border-box'
  //     }}
  //   >
  //     <div style={{ width: '100%', maxWidth: '575px' }}>
  //       <HomeHeader />
  //     </div>
  //   </div>
  // )
  return (
    <Router>
      <Route component={UserView} />
    </Router>
  )
}

export default Sandbox
