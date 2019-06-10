import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const AttributeCardList = ({ list, ListComponent, onClick, ...props }) =>
  list.map((item, idx) => (
    <ListComponent
      key={idx}
      idx={idx}
      item={item}
      onClick={onClick}
      {...props}
    />
  ))

const mapStateToProps = (state, ownProps) => {
  switch (ownProps.type) {
    case 'user':
      return { list: Object.entries(state.userState.collections) }
    case 'contact':
      return { list: Object.entries(state.contactState.collections) }
    case 'types':
      return { list: state.attributeState.types }
    default:
      return { list: [] }
  }
}

AttributeCardList.propTypes = {
  // List to iterate
  list: PropTypes.array.isRequired,
  // Component to render
  ListComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
  // Indicate the type of list to iterate over
  type: PropTypes.oneOf(['user', 'contact', 'types']),
  // onClick function to pass to component
  onClick: PropTypes.func
}

export default connect(mapStateToProps)(AttributeCardList)
