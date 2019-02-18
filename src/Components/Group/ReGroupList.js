import React from 'react'

import ComingSoon from '../Util/ComingSoon'
import RePlusFAB from '../Buttons/RePlusFAB'

const ReGroupList = () => {
  return (
    <div style={{ height: '100%' }}>
      <ComingSoon name="Groups" />
      <RePlusFAB selected={false} route="/share" />
    </div>
  )
}

export default ReGroupList

// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { fetchContacts } from '../../actions'

// class ReGroupList extends Component {
//   componentDidMount() {
//     this.props.fetchContacts()
//   }
//   renderContactList() {
//     return this.props.contacts.list.map(contact => {
//       return <div key={contact.id}>{contact.name}</div>
//     })
//   }
//   render() {
//     return <div className="contact-list">{this.renderContactList()}</div>
//   }
// }

// const mapStateToProps = state => {
//   return {
//     contacts: state.contacts
//   }
// }

// export default connect(
//   mapStateToProps,
//   { fetchContacts }
// )(ReGroupList)
