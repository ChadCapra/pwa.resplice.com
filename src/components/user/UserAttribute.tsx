import React, { useState } from 'react'
import { IEntityAttributeWithType } from '../../store/store'

import { handleAttributeAction } from '../../helpers'

import Attribute from '../shared/attribute/Attribute'
import ActionIcon from '../shared/util/ActionIcon'
import Modal from '../shared/modal/Modal'
import AttributeContext from '../shared/attribute/AttributeContext'
import EditAttribute from './EditAttribute'
import DeleteAttribute from './DeleteAttribute'

type Props = {
  attribute: IEntityAttributeWithType
}

const UserAttribute = ({ attribute }: Props) => {
  const [showContext, setShowContext] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const actions = attribute.attribute_type.actions.sort((a, b) => {
    return a.sort_order - b.sort_order
  })

  const handleActionClick = (actionName: string) => {
    setShowContext(false)
    window.navigator.vibrate(50)
    switch (actionName) {
      case 'verify':
        return
      case 'edit':
        setShowEdit(true)
        return
      case 'delete':
        setShowDelete(true)
        return
      default:
        handleAttributeAction(actionName)
        return
    }
  }

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
          onActionClick={handleActionClick}
        />
      </Modal>

      <Modal show={showEdit} height="100%" onClose={() => setShowEdit(false)}>
        <EditAttribute attribute={attribute} />
      </Modal>

      <Modal
        show={showDelete}
        height="100%"
        onClose={() => setShowDelete(false)}
      >
        <DeleteAttribute />
      </Modal>
    </>
  )
}

export default UserAttribute
