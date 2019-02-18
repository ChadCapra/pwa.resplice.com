import React, { Component } from 'react'
import ReNotification from '../Util/ReNotification'
import ReUpdate from './ReUpdate'

export default class ReUserUpdates extends Component {
  state = {
    updates: [
      {
        id: 0,
        contact: 'Mace Windu',
        isGroupInvite: false,
        item: 'Mobile Phone Number'
      },
      {
        id: 1,
        contact: 'Darth Vader',
        isGroupInvite: false,
        item: 'Mobile Phone Number'
      },
      {
        id: 2,
        contact: 'Finn',
        isGroupInvite: true,
        item: 'Jedi'
      }
    ]
  }

  renderUpdates() {
    return this.state.updates.map(update => {
      return (
        <ReUpdate
          name={update.contact}
          item={update.item}
          isGroupInvite={update.isGroupInvite}
          key={update.id}
        />
      )
    })
  }

  render() {
    return (
      <div className="user-updates">
        <ReNotification title="Missing" btnText="Fix Now" type="primary">
          Security Questions
        </ReNotification>
        <div>{this.renderUpdates()}</div>
      </div>
    )
  }
}
