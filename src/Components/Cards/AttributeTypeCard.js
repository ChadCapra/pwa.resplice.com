import React from 'react'
import PropTypes from 'prop-types'
import Columns from 'react-bulma-components/lib/components/columns'

import ActionIcon from '../Util/ActionIcon'

const formatValues = values => {
  return Object.values(values).reduce((final, val) => {
    if (!val) return final
    return final.concat(' ', val)
  }, '')
}

const AttributeTypeCard = ({
  idx,
  item: attrType,
  previewValues,
  className,
  onClick
}) => {
  let header = attrType.name
  let name = attrType.preview_name
  let value = formatValues(attrType.preview_value)

  if (previewValues) {
    const { collection, name: valName, ...values } = previewValues
    header = collection || header
    name = valName || name
    value = formatValues(values) || value
  }

  const actions = attrType.actions.filter(action => !action.unverified_only)
  return (
    <div
      className={`type-card ${className ? className : ''}`}
      onClick={() => onClick(attrType, idx)}
    >
      <div className="card-header">{header}</div>
      <Columns className="card-attribute" breakpoint="mobile" multiline={false}>
        <Columns.Column size={1}>
          <ActionIcon name={actions[0].icon} fill="#C4C4C4" width="2.5em" />
        </Columns.Column>
        <Columns.Column className="card-attribute-text" size={7}>
          <span className="card-attribute-text-name">{name}</span>
          <span>{value}</span>
        </Columns.Column>
        <Columns.Column size={1}>
          <ActionIcon name={actions[1].icon} fill="#C4C4C4" width="2.5em" />
        </Columns.Column>
      </Columns>
    </div>
  )
}

AttributeTypeCard.propTypes = {
  idx: PropTypes.number,
  item: PropTypes.object.isRequired,
  previewValues: PropTypes.object,
  onClick: PropTypes.func
}

export default AttributeTypeCard
