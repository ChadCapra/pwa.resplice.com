import React, { Component } from 'react'
import { connect } from 'react-redux'

import MdMail from 'react-ionicons/lib/MdMail'
import MdCall from 'react-ionicons/lib/MdCall'
import ReContact from '../Contact/ReContact'
import MdClose from 'react-ionicons/lib/MdClose'

import './share.scss'

class ReShareDropdown extends Component {
  renderType = queryType => {
    if (queryType === 'phone') {
      return <MdCall fontSize="2.5em" color="#1BBC9B" />
    } else if (queryType === 'email') {
      return <MdMail fontSize="2.5em" color="#1BBC9B" />
    } else {
      return <MdMail fontSize="2.5em" color="#C4C4C4" />
    }
  }

  renderContacts = () => {
    if (this.props.contacts.length <= 0) {
      return <div style={{ textAlign: 'center' }}>No Contacts</div>
    }
    this.props.contacts.map(contact => {
      return (
        <div
          className="dropdown-result"
          key={contact.id}
          onClick={() => this.props.handleContactClick(contact.id)}
        >
          <ReContact contact={contact} />
        </div>
      )
    })
  }

  render() {
    const { query, queryType, handleAttrClick } = this.props

    return (
      <div className="share-dropdown">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <MdClose
            style={{ margin: '0 0 10px 0', cursor: 'pointer' }}
            color="#1bbc9b"
            fontSize="1.5em"
            className="re-exit-icon"
            onClick={this.props.close}
          />
        </div>

        <div className="dropdown-query">
          {this.renderType(queryType)}
          <div className="dropdown-query-text" onClick={handleAttrClick}>
            {query}
          </div>
        </div>
        {this.renderContacts()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contactState.list
  }
}

export default connect(mapStateToProps)(ReShareDropdown)
