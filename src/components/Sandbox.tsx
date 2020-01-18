import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import SwipeView from './shared/layout/SwipeView'

import AttributeCard from './domain/AttributeCard'

const mockAttribute = {
  uuid: 'mockAttr',
  attribute_type: {
    id: 1,
    sort_order: 1,
    name: 'phone',
    verify_seconds: '',
    preview_name: 'Mobile',
    empty_value: { phone: '9999999999' },
    actions: [
      {
        sort_order: 1,
        name: 'call',
        display_name: 'call',
        icon: 'MdCall',
        user_only: true,
        unverified_only: false,
        action_value: ''
      }
    ]
  },
  name: 'Mobile',
  collection: 'Phones',
  value_uuid: 'value',
  value: { phone: '2185910657' },
  verified_at: '',
  expiry: ''
}

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
