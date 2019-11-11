import React from 'react'

import Card from '../Card/Card'
import Attribute from '../Card/Attribute'

const CardList = ({ list, handleAction }) =>
  list.map((item, idx) => {
    const collection = item[0]
    const attributes = item[1]
    return (
      <Card key={idx} border>
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
                immutableActions
              />
            )
          })}
        </Card.Body>
      </Card>
    )
  })

export default CardList
