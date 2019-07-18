import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MdMail from 'react-ionicons/lib/MdMail'
import MdCall from 'react-ionicons/lib/MdCall'
import ReContact from '../Profile/ReProfileItem'

const QUERY_TYPES = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
  CONTACT: 'CONTACT',
  NONE: ''
}

const renderIcon = queryType => {
  if (queryType === QUERY_TYPES.PHONE) {
    return <MdCall fontSize="2.5em" color="#1BBC9B" />
  } else if (queryType === QUERY_TYPES.EMAIL) {
    return <MdMail fontSize="2.5em" color="#1BBC9B" />
  } else {
    return <MdMail fontSize="2.5em" color="#C4C4C4" />
  }
}

const ReShareDropdown = ({ query, queryType, handleAttrClick, contacts }) => {
  const handleContactClick = uuid => {
    // TODO: Navigate to contact page
    console.log(uuid)
  }

  const renderContacts = () => {
    if (contacts.length <= 0) {
      return <div style={{ textAlign: 'center' }}>No Contacts</div>
    }
    contacts.map(con => {
      const uuid = con[0]
      const contact = con[1]
      //console.log(contact)
      return (
        <div
          className="dropdown-result"
          key={uuid}
          onClick={() => handleContactClick(uuid)}
        >
          <ReContact profile={contact} />
        </div>
      )
    })
  }

  return (
    <div className="share-dropdown">
      <div className="dropdown-query">
        {renderIcon(queryType)}
        <div className="dropdown-query-text" onClick={handleAttrClick}>
          {query}
        </div>
      </div>
      {renderContacts()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    contacts: Object.entries(state.contactState.contacts)
  }
}

ReShareDropdown.propTypes = {
  query: PropTypes.string.isRequired,
  queryType: PropTypes.string.isRequired,
  handleAttrClick: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(ReShareDropdown)
