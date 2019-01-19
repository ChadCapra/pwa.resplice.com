import React from 'react'

// import MdCall from 'react-ionicons/lib/MdCall'
import MdMail from 'react-ionicons/lib/MdMail'
import ReContact from '../Contact/ReContact'

import './share.scss'

const ReShareDropdown = ({ query, contacts }) => {
  return (
    <div className="share-dropdown">
      <div className="dropdown-query">
        <MdMail fontSize="2.5em" color="#C4C4C4" />
        <div className="dropdown-query-text">{query}</div>
      </div>
      {contacts.map(contact => {
        return (
          <div className="dropdown-result" key={contact.id}>
            <ReContact contact={contact} />
          </div>
        )
      })}
    </div>
  )
}

export default ReShareDropdown
