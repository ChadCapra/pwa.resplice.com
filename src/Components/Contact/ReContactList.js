import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import ReContact from './ReContact'
import RePlusFAB from '../Buttons/RePlusFAB'

class ReContactList extends Component {
  state = {
    dummyContact: {
      name: 'Tap the Plus to start sharing!',
      tags: 'You have no contacts',
      avatar: '',
      uuid: '23490909e-234-gdfgdf-w4323'
    },
    toShare: false
  }

  renderContactList() {
    if (this.props.contacts.length > 0) {
      return this.props.contacts.map(contact => {
        return <ReContact key={contact.id} contact={contact} />
      })
    } else {
      return <ReContact key={1} contact={this.state.dummyContact} dummy />
    }
  }
  render() {
    if (this.state.toShare) return <Redirect push to="/share" />
    return (
      <div className="contact-list">
        {this.renderContactList()}
        <RePlusFAB onClick={() => this.setState({ toShare: true })} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contactState.contacts
  }
}

export default connect(mapStateToProps)(ReContactList)
