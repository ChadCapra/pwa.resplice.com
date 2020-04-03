import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  IUserAttribute,
  IAddAttributeValues,
  AttributeType,
  RespliceState
} from '../../store/store'

import Flex from '../shared/layout/Flex'
import AttributeForm from './AttributeForm'
import AttributeCard from '../shared/attribute/AttributeCard'
import Attribute from '../shared/attribute/Attribute'
import ActionIcon from '../shared/util/ActionIcon'

import { addUserAttribute } from '../../store/user/userActions'

const Container = styled(Flex)`
  margin: auto;
  max-width: ${props => props.theme['mobile-max-width']};
  padding: 2em;
`

const StyledHeader = styled.h2`
  font-size: 1.5em;
  font-weight: 500;
  padding-bottom: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const getTypeValue = (value: Dictionary<string | null>) => {
  const typeValue: Dictionary<string> = {}
  Object.keys(value).forEach(val => {
    typeValue[val] = ''
  })
  return typeValue
}

type Props = {
  attributeType: AttributeType
  loading: boolean
  onBack: () => void
  addUserAttribute: (addedAttribute: IAddAttributeValues) => Promise<void>
}

const AddAttributeForm = ({
  attributeType,
  loading,
  onBack,
  addUserAttribute
}: Props) => {
  const [addingAttribute, setAddingAttribute] = useState({
    attribute_type_id: attributeType.id,
    collection: attributeType.default_collection,
    name: attributeType.name,
    value: getTypeValue(attributeType.value_template)
  })

  const onSubmit = ({ collection, name, ...value }: Dictionary<any>) => {
    addUserAttribute({ ...addingAttribute, collection, name, value })
  }
  const validate = ({ collection, name, ...value }: Dictionary<any>) => {
    setAddingAttribute({ ...addingAttribute, collection, name, value })

    const errors: Dictionary<string> = {}
    if (!collection) {
      errors.collection = 'Please select or enter a collection name'
    }
    if (!name) {
      errors.name = 'Please enter an attribute name'
    }
    if (value.phone && value.phone.length < 3) {
      errors.phone = 'Please enter a phone number'
    }
    if (
      value.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)
    ) {
      errors.email = 'Please enter a valid email address'
    }
    return errors
  }

  const actions = attributeType.actions.filter(
    action => !(action.name === 'verify')
  )

  return (
    <Container direction="column">
      <StyledHeader>Editing {addingAttribute.name}</StyledHeader>
      <AttributeCard collectionName={addingAttribute.collection}>
        <Attribute
          attribute={
            addingAttribute as IUserAttribute & {
              attribute_type: AttributeType
            }
          }
          leftIcon={
            <ActionIcon
              name={actions[0].icon}
              width="2.5em"
              fill="var(--brand-primary)"
              clickable
              onClick={() => {}}
            />
          }
          rightIcon={
            <ActionIcon
              name={actions[1].icon}
              width="2.5em"
              fill="var(--brand-primary)"
              clickable
              onClick={() => {}}
            />
          }
        />
      </AttributeCard>

      <AttributeForm
        initialValues={{
          collection: addingAttribute.collection,
          name: addingAttribute.name,
          ...addingAttribute.value
        }}
        loading={loading}
        validate={validate}
        onSubmit={onSubmit}
      />
    </Container>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    loading: state.userState.loading
  }
}

export default connect(mapStateToProps, { addUserAttribute })(AddAttributeForm)
