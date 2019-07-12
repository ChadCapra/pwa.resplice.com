import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Columns from 'react-bulma-components/lib/components/columns'

import ReDropdown from '../Util/ReDropdown'
import ActionIcon from '../Util/ActionIcon'

import './card.scss'

const combineAttrValues = (attr, delim) => {
  return Object.values(attr).reduce((accum, value, idx) => {
    if (!value) return accum
    if (idx < 1) return value
    return accum.concat(delim, value)
  }, '')
}

const ViewCard = ({ item, handleAction, ...props }) => {
  const [showDropdownIdx, setDropdownIdx] = useState(-1)
  const collection = item[0]
  const attributes = item[1]

  const allPending = attributes.every(attr => !!attr.pending_attribute_value)

  return (
    <div className={`card${allPending ? ' pending' : ''}`}>
      <h1 className="card-header">{collection}</h1>
      {attributes.map((attr, idx) => (
        <Columns
          key={attr.uuid}
          className={`card-attribute${
            !allPending && attr.pending_attribute_value ? ' pending' : ''
          }`}
          breakpoint="mobile"
          multiline={false}
        >
          <Columns.Column
            size={1}
            onClick={() =>
              handleAction(attr.actions[0].name, {
                uuid: attr.uuid,
                value: attr.value
              })
            }
          >
            <ActionIcon
              name={attr.actions[0].icon}
              fill={props.contactUuid ? '#1BBC9B' : '#C4C4C4'}
              width="2.5em"
            />
          </Columns.Column>
          <Columns.Column
            className="card-attribute-text"
            size={7}
            onClick={() => setDropdownIdx(idx)}
          >
            <span className="card-attribute-text-name">{attr.name}</span>
            <span>{combineAttrValues(attr.value, ' ')}</span>
            {idx === showDropdownIdx && (
              <ReDropdown
                isUserAttribute
                items={attr.actions}
                onClick={action =>
                  handleAction(action, { uuid: attr.uuid, value: attr.value })
                }
                close={() => setDropdownIdx(-1)}
              />
            )}
          </Columns.Column>
          <Columns.Column
            size={1}
            onClick={() =>
              handleAction(attr.actions[1].name, {
                uuid: attr.uuid,
                value: attr.value
              })
            }
          >
            <ActionIcon
              name={attr.actions[1].icon}
              fill={props.contactUuid ? '#1BBC9B' : '#C4C4C4'}
              width="2.5em"
            />
          </Columns.Column>
        </Columns>
      ))}
    </div>
  )
}

ViewCard.propTypes = {
  // Array of size 2
  // item[0] is the collection name
  // item[1] is the collection attributes with actions
  item: PropTypes.array.isRequired,
  handleAction: PropTypes.func.isRequired
}

export default ViewCard
