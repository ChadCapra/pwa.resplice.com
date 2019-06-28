import React from 'react'
import PropTypes from 'prop-types'
import Columns from 'react-bulma-components/lib/components/columns'

import ActionIcon from '../Util/ActionIcon'
import ReCheckbox from '../Form/ReCheckbox'

import './card.scss'

const combineAttrValues = values => {
  return Object.values(values).reduce((accum, value) => {
    return accum.concat(' ', value)
  }, '')
}

const ShareCard = ({ item, toggleKey, toggleAttribute }) => {
  return (
    <div className="card">
      <h1 className="card-header">{item[0]}</h1>
      {item[1].map(attr => {
        const actionIconName = attr.actions[0].icon

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
                    onClick={() => toggleAttribute(!attr[toggleKey], attr.uuid)}
                    checked={attr[toggleKey]}
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

ShareCard.propTypes = {
  item: PropTypes.array.isRequired,
  toggleAttribute: PropTypes.func.isRequired
}

export default ShareCard
