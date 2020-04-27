import React, { useState } from 'react'
import { IUserAttribute, AttributeType } from '../../store/store'

import { handleAttributeAction } from '../../helpers'

import Attribute from '../shared/attribute/Attribute'
import ActionIcon from '../shared/util/ActionIcon'
import Modal from '../shared/modal/Modal'
import AttributeContext from '../shared/attribute/AttributeContext'
import EditAttribute from './EditAttribute'
import DeleteAttribute from './DeleteAttribute'

type Props = {
  attribute: IUserAttribute & { attribute_type: AttributeType }
}

const UserAttribute = ({ attribute }: Props) => {
  const [showContext, setShowContext] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  let actions = attribute.attribute_type.actions.sort((a, b) => {
    return a.sort_order - b.sort_order
  })
  if (attribute.latest_to_verify) {
    actions = actions.filter((action) => !(action.name === 'verify'))
  }

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
        handleAttributeAction(actionName, Object.values(attribute.value))
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
            onClick={() => handleActionClick(actions[0].name)}
          />
        }
        rightIcon={
          <ActionIcon
            name={actions[1].icon}
            width="2.5em"
            fill="var(--brand-primary)"
            clickable
            onClick={() => handleActionClick(actions[1].name)}
          />
        }
        onClick={() => setShowContext(true)}
      />

      <Modal
        show={showContext}
        height="60%"
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
