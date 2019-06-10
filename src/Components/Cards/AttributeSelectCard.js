import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Columns from 'react-bulma-components/lib/components/columns'

import ActionIcon from '../Util/ActionIcon'
import ReCheckbox from '../Input/ReCheckbox'

import './card.scss'

const combineAttrValues = values => {
  return Object.values(values).reduce((accum, value) => {
    return accum.concat(' ', value)
  }, '')
}

const AttributeSelectCard = ({
  item,
  types,
  attributeList,
  toggleAttribute
}) => {
  const checkAttributes = uuid => {
    return attributeList.findIndex(attr => attr.uuid === uuid) >= 0
  }

  return (
    <div className="card">
      <div className="card-header">{item[0]}</div>
      {item[1].map(attr => {
        const attrType = types.find(
          attrType => attrType.id === attr.attribute_type_id
        )
        const actionIconName = attrType.actions.filter(
          action => !action.unverified_only
        )[0].icon

        return (
          <div key={attr.uuid}>
            <Columns
              className="card-attribute"
              breakpoint="mobile"
              multiline={false}
            >
              <Columns.Column size={1}>
                <ActionIcon
                  name={actionIconName}
                  fill="#C4C4C4"
                  width="2.5em"
                />
              </Columns.Column>
              <Columns.Column className="card-attribute-text" size={7}>
                <span className="card-attribute-text-name">{attr.name}</span>
                <span>{combineAttrValues(attr.value)}</span>
              </Columns.Column>
              <Columns.Column
                size={1}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <div className="card-checkbox">
                  <ReCheckbox
                    onClick={() => toggleAttribute(attr)}
                    checked={checkAttributes(attr.uuid)}
                  />
                </div>
              </Columns.Column>
            </Columns>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => {
  return { types: state.attributeState.types }
}

AttributeSelectCard.propTypes = {
  item: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  attributeList: PropTypes.array.isRequired,
  toggleAttribute: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(AttributeSelectCard)
