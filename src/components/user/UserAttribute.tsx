import React from 'react'
import { IEntityAttributeWithType } from '../../store/store'

import Attribute from '../shared/attribute/Attribute'
import ActionIcon from '../shared/util/ActionIcon'

type Props = {
  attribute: IEntityAttributeWithType
}

const UserAttribute = ({ attribute }: Props) => {
  const actions = attribute.attribute_type.actions.sort((a, b) => {
    return a.sort_order - b.sort_order
  })

  return (
    <Attribute
      attribute={attribute}
      leftIcon={
        // <ActionIcon
        //   name={attribute.attribute_type.actions[0].icon}
        //   width="2.5em"
        //   fill="#C8CCD4"
        // />
        <ActionIcon
          name={actions[0].icon}
          width="2.5em"
          fill="#1BBC9B"
          clickable
        />
      }
      rightIcon={
        <ActionIcon
          name={actions[1].icon}
          width="2.5em"
          fill="#1BBC9B"
          clickable
        />
      }
    />
  )
}

export default UserAttribute
