import React, { Component } from 'react'
import { connect } from 'react-redux'

import MdMail from 'react-ionicons/lib/MdMail'
import MdCall from 'react-ionicons/lib/MdCall'
import ReContact from '../Contact/ReContact'

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
    this.props.contacts.map(con => {
      const uuid = con[0]
      const contact = con[1]
      //console.log(contact)
      return (
        <div
          className="dropdown-result"
          key={uuid}
          onClick={() => this.props.handleContactClick(uuid)}
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
    contacts: Object.entries(state.contactState.contacts)
  }
}

export default connect(mapStateToProps)(ReShareDropdown)
