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

  render() {
    const {
      query,
      queryType,
      contacts,
      handleAttrClick,
      handleContactClick
    } = this.props

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
        {contacts.map(contact => {
          return (
            <div
              className="dropdown-result"
              key={contact.id}
              onClick={() => handleContactClick(contact.id)}
            >
              <ReContact contact={contact} />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts.list
  }
}

export default connect(mapStateToProps)(ReShareDropdown)
