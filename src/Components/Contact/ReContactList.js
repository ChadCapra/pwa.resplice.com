import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReContact from './ReContact'
import RePlusFAB from '../Buttons/RePlusFAB'

class ReContactList extends Component {
  state = {
    dummyContact: {
      name: 'Tap the Plus to start sharing!',
      tags: 'You have no contacts',
      avatar: '',
      uuid: '23490909e-234-gdfgdf-w4323'
    }
  }
  renderContactList() {
    if (this.props.contacts.list.length > 0) {
      return this.props.contacts.list.map(contact => {
        return <ReContact key={contact.id} contact={contact} />
      })
    } else {
      return <ReContact key={1} contact={this.state.dummyContact} dummy />
    }
  }
  render() {
    return (
      <div className="contact-list">
        {this.renderContactList()}
        <RePlusFAB selected={false} route="/share" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts
  }
}

export default connect(mapStateToProps)(ReContactList)
