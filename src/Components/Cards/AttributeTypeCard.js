import React from 'react'
import PropTypes from 'prop-types'
import Columns from 'react-bulma-components/lib/components/columns'

import ActionIcon from '../Util/ActionIcon'

const AttributeTypeCard = ({ idx, item: attrType, previewValues, onClick }) => {
  let header = attrType.name
  let name = 'default'
  let value = 'default value'
  if (previewValues) {
    header = previewValues.collection || header
    name = previewValues.name || name
    value = previewValues.value || value
  }
  return (
    <div className="card" onClick={() => onClick(attrType, idx)}>
      <div className="card-header">{header}</div>
      <Columns className="card-attribute" breakpoint="mobile" multiline={false}>
        <Columns.Column size={1}>
          <ActionIcon
            name={attrType.actions[0].icon}
            fill="#C4C4C4"
            width="2.5em"
          />
        </Columns.Column>
        <Columns.Column className="card-attribute-text" size={7}>
          <span className="card-attribute-text-name">{name}</span>
          <span>{value}</span>
        </Columns.Column>
        <Columns.Column size={1}>
          <ActionIcon
            name={attrType.actions[1].icon}
            fill="#C4C4C4"
            width="2.5em"
          />
        </Columns.Column>
      </Columns>
    </div>
  )
}

AttributeTypeCard.propTypes = {
  idx: PropTypes.number,
  item: PropTypes.object.isRequired,
  previewValues: PropTypes.object,
  onClick: PropTypes.func.isRequired
}

export default AttributeTypeCard
