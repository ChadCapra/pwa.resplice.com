import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchContacts } from '../../actions'

import ReContact from './ReContact'

class ReContactList extends Component {
  componentDidMount() {
    this.props.fetchContacts()
  }
  renderContactList() {
    return this.props.contacts.map(contact => {
      return <ReContact key={contact.id} contact={contact} />
    })
  }
  render() {
    return <div className="contact-list">{this.renderContactList()}</div>
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts
  }
}

export default connect(
  mapStateToProps,
  { fetchContacts }
)(ReContactList)
