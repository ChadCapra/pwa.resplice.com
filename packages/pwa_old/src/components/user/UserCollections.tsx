import React from 'react'
import { connect } from 'react-redux'
import { buildCollections } from '../../helpers'
import { RespliceState, IUserAttribute, AttributeType } from '../../store/store'

import Flex from '../shared/layout/Flex'
import AttributeCard from '../shared/attribute/AttributeCard'
import UserAttribute from './UserAttribute'

type Props = {
  attributes: Dictionary<IUserAttribute> | null
  attributeTypes: AttributeType[] | null
}

const UserCollections = ({ attributes, attributeTypes }: Props) => {
  if (!attributes || !attributeTypes) return <p>Loading</p>
  const collections = buildCollections(attributes, attributeTypes)

  return (
    <Flex direction="column">
      {Object.entries(collections).map(([collectionName, attrs]) => {
        return (
          <AttributeCard key={collectionName} collectionName={collectionName}>
            {attrs.map(attr => {
              return <UserAttribute key={attr.uuid} attribute={attr} />
            })}
          </AttributeCard>
        )
      })}
    </Flex>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    attributes: state.userState.attributes,
    attributeTypes: state.utilState.attributeTypes
  }
}

export default connect(mapStateToProps)(UserCollections)
