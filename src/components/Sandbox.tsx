import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import SwipeView from './shared/layout/SwipeView'

const Sandbox = () => {
  // return (
  //   <div
  //     style={{
  //       // display: 'flex',
  //       // justifyContent: 'center',
  //       // alignItems: 'center',
  //       width: '100%',
  //       height: '100%',
  //       // padding: '1.5em',
  //       overflow: 'hidden',
  //       boxSizing: 'border-box'
  //     }}
  //   >
  //   </div>
  // )
  return (
    <Router>
      <Route
        render={_ => {
          return (
            <SwipeView
              navText={['Groups', 'Individuals']}
              header={<input placeholder="search" style={{ width: '100%' }} />}
            >
              <div style={{ padding: '1.5em' }}>Swipe 1</div>
              <div style={{ padding: '1.5em' }}>Swipe 2</div>
            </SwipeView>
          )
        }}
      />
    </Router>
  )
}

export default Sandbox
