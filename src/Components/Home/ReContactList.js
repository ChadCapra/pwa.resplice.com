import React from 'react'

import ComingSoon from '../Util/ComingSoon'
import RePlusFAB from '../Buttons/RePlusFAB'

const ReContactList = () => {
  return (
    <div style={{ height: '90%', position: 'relative' }}>
      <ComingSoon name="Contacts" />
      <RePlusFAB selected={false} route="/share" />
    </div>
  )
}

export default ReContactList

// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { fetchContacts } from '../../actions'

// import ReContact from '../Contact/ReContact'

// class ReContactList extends Component {
//   componentDidMount() {
//     this.props.fetchContacts()
//   }
//   renderContactList() {
//     return this.props.contacts.list.map(contact => {
//       return <ReContact key={contact.id} contact={contact} />
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
// )(ReContactList)
