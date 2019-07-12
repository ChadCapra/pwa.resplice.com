import React from 'react'
import PropTypes from 'prop-types'

const CardList = ({ list, Card, ...props }) =>
  list.map((item, idx) => <Card key={idx} idx={idx} item={item} {...props} />)

CardList.propTypes = {
  // List to iterate
  list: PropTypes.array.isRequired,
  // Card Component to render
  Card: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
}

export default CardList
