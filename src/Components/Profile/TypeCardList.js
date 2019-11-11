import React from 'react'

import Card from '../Card/Card'
import Attribute from '../Card/Attribute'

import cardStyles from '../Card/Card.module.scss'

const TypeCardList = ({ list, onClick }) =>
  list.map((item, idx) => {
    const collection = item.default_collection
    const attribute = {
      id: item.id,
      name: item.preview_name,
      value: item.preview_value,
      actions: item.actions
    }

    return (
      <Card
        key={collection}
        className={cardStyles.TypeCard}
        border
        onClick={() => onClick(item, idx)}
      >
        <Card.Header>
          <h1>{collection}</h1>
        </Card.Header>
        <Card.Body>
          <Attribute attribute={attribute} immutableActions noDropdown />
        </Card.Body>
      </Card>
    )
  })

export default TypeCardList
