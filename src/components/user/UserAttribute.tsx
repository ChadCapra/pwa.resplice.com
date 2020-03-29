import React, { useState } from 'react'
import { IEntityAttributeWithType } from '../../store/store'

import Attribute from '../shared/attribute/Attribute'
import ActionIcon from '../shared/util/ActionIcon'
import Modal from '../shared/modal/Modal'
import AttributeContext from '../shared/attribute/AttributeContext'

type Props = {
  attribute: IEntityAttributeWithType
}

const UserAttribute = ({ attribute }: Props) => {
  const [showContext, setShowContext] = useState(false)
  const actions = attribute.attribute_type.actions.sort((a, b) => {
    return a.sort_order - b.sort_order
  })

  return (
    <>
      <Attribute
        attribute={attribute}
        leftIcon={
          <ActionIcon
            name={actions[0].icon}
            width="2.5em"
            fill="var(--brand-primary)"
            clickable
          />
        }
        rightIcon={
          <ActionIcon
            name={actions[1].icon}
            width="2.5em"
            fill="var(--brand-primary)"
            clickable
          />
        }
        onClick={() => setShowContext(true)}
      />

      <Modal
        show={showContext}
        height="45%"
        onClose={() => setShowContext(false)}
      >
        <AttributeContext
          attributeName={attribute.name}
          attributeActions={actions}
        />
      </Modal>
    </>
  )
}

export default UserAttribute
