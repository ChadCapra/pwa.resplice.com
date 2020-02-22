import React from 'react'

// TODO: remove line when using global state
import { UserMock } from '../../store/__mock_store__/user'
import { attributeTypes } from '../../store/__mock_store__/attributeTypes'
import { buildCollections } from '../../helpers'

import Flex from '../shared/layout/Flex'
import AttributeCard from '../shared/attribute/AttributeCard'
import UserAttribute from './UserAttribute'

// TODO: remove line when using global state
const { attributes } = UserMock

const UserCollections = () => {
  const collections = buildCollections(attributes, attributeTypes)

  return (
    <Flex direction="column">
      {Object.entries(collections).map(([collection, attrs]) => {
        return (
          <AttributeCard key={collection} collection={collection}>
            {attrs.map(attr => {
              return (
                <UserAttribute key={attr.attribute_uuid} attribute={attr} />
              )
            })}
          </AttributeCard>
        )
      })}
    </Flex>
  )
}

export default UserCollections
