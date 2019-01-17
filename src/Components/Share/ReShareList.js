import React, { Component } from 'react'

import ReInputCustom from '../Input/ReInputCustom'
import ReButton from '../Buttons/ReButton'

import './share.scss'

class ReShareList extends Component {
  state = {
    shareList: [
      {
        id: 1,
        value: '2185910657'
      },
      {
        id: 2,
        value: 'macewinduMF'
      },
      {
        id: 3,
        value: '2185910657'
      }
    ]
  }
  render() {
    return (
      <div className="share-list">
        <h1 className="share-list-header">Add by Phone, Email, or Username</h1>
        <ReInputCustom />
        <ReButton type="primary" text="Share" width="200px" />
      </div>
    )
  }
}

export default ReShareList
