import React, { Component } from 'react'
import { connect } from 'react-redux'

class AttributeCardList extends Component {
  render() {
    const { collections, Component } = this.props
    return Object.keys(collections).map((col, idx) => {
      return <Component key={idx} header={col} attrs={collections[col]} />
    })
  }
}

const mapStateToProps = (state, ownProps) => {
  return ownProps.user
    ? { collections: state.user.collections }
    : { collections: state.contacts.collections }
}

export default connect(mapStateToProps)(AttributeCardList)
