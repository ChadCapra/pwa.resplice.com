import React from 'react'

import Card from '../Card/Card'
import Attribute from '../Card/Attribute'
import Checkbox from '../Form/ReCheckbox'

const CardList = ({ list, toggleKey, toggleAttribute }) =>
  list.map(item => {
    const collection = item[0]
    const attributes = item[1]
    return (
      <Card key={collection} border>
        <Card.Header>
          <h1>{collection}</h1>
        </Card.Header>
        <Card.Body>
          {attributes.map(attribute => {
            return (
              <Attribute
                key={attribute.uuid}
                attribute={attribute}
                immutableActions
                noDropdown
              >
                <Attribute.RightChild>
                  {!attribute.shareDisabled && (
                    <Checkbox
                      checked={attribute[toggleKey]}
                      onClick={() =>
                        toggleAttribute(!attribute[toggleKey], attribute.uuid)
                      }
                    />
                  )}
                </Attribute.RightChild>
              </Attribute>
            )
          })}
        </Card.Body>
      </Card>
    )
  })

export default CardList
