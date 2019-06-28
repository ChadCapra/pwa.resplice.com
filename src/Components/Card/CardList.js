import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const CardList = ({ list, Card, ...props }) =>
  list.map((item, idx) => <Card key={idx} idx={idx} item={item} {...props} />)

const mapStateToProps = (state, ownProps) => {
  let list = []
  switch (ownProps.type) {
    case 'user':
      list = Object.entries(state.userState.collections)
      break
    case 'contact':
      list = Object.entries(
        state.contactState.contacts[ownProps.contactUuid].collections
      )
      break
    case 'types':
      list = Object.values(state.userState.types)
      break
    default:
      list = ownProps.list
  }

  return {
    list
  }
}

CardList.propTypes = {
  // List to iterate
  list: PropTypes.array.isRequired,
  // Card Component to render
  Card: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  // Indicate the type of list to iterate over
  type: PropTypes.oneOf(['user', 'contact', 'types'])
}

export default connect(mapStateToProps)(CardList)
