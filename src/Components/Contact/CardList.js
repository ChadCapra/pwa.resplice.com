import React from 'react'

import Card from '../Card/Card'
import Attribute from '../Card/Attribute'

const CardList = ({ list, handleAction }) =>
  list.map(item => {
    const collection = item[0]
    const attributes = item[1]
    const cardPending = attributes.every(
      attribute => attribute.pending_attribute_value
    )

    return (
      <Card key={collection} pending={cardPending} border>
        <Card.Header>
          <h1>{collection}</h1>
        </Card.Header>
        <Card.Body>
          {attributes.map(attribute => {
            return (
              <Attribute
                key={attribute.uuid}
                attribute={attribute}
                handleAction={handleAction}
                pending={!cardPending && attribute.pending_attribute_value}
                immutableActions={attribute.pending_attribute_value}
                noDropdown={attribute.pending_attribute_value}
              />
            )
          })}
        </Card.Body>
      </Card>
    )
  })

export default CardList
