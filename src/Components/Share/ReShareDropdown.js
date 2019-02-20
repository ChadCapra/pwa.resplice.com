import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import MdMail from 'react-ionicons/lib/MdMail'
import MdCall from 'react-ionicons/lib/MdCall'
import ReContact from '../Contact/ReContact'

import './share.scss'

class ReShareDropdown extends Component {
  // componentWillMount() {
  //   // remove event listener for clicks on the page
  //   document.addEventListener('click', this.handleClick, false)
  // }
  // componentWillUnmount() {
  //   // remove event listener for clicks on the page
  //   document.removeEventListener('click', this.handleClick, false)
  // }

  // handleClick = e => {
  //   if (!ReactDOM.findDOMNode(this).contains(e.target)) {
  //     // the click was outside of the dropdown, so handle closing here
  //     this.props.close()
  //   }
  // }

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
