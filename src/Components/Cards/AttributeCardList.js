import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AttributeCardList extends Component {
  render() {
    const { collections, ListComponent } = this.props
    return Object.keys(collections).map((col, idx) => {
      return <ListComponent key={idx} header={col} attrs={collections[col]} />
    })
  }
}

const mapStateToProps = (state, ownProps) => {
  return ownProps.user
    ? { collections: state.userState.collections }
    : { collections: state.contactState.collections }
}

AttributeCardList.propTypes = {
  // Collection of attributes
  collections: PropTypes.object.isRequired,
  // Component to render
  ListComponent: PropTypes.func.isRequired,
  // Indicate whether the collections for the current user or a contact
  user: PropTypes.bool
}

export default connect(mapStateToProps)(AttributeCardList)
