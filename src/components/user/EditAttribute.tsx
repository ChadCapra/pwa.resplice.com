import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { IUserAttribute, AttributeType, RespliceState } from '../../store/store'

import Flex from '../shared/layout/Flex'
import AttributeForm from './AttributeForm'
import AttributeCard from '../shared/attribute/AttributeCard'
import Attribute from '../shared/attribute/Attribute'
import ActionIcon from '../shared/util/ActionIcon'

import { editUserAttribute } from '../../store/user/userActions'

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

type Props = {
  attribute: IUserAttribute & { attribute_type: AttributeType }
  loading: boolean
  editUserAttribute: (editedAttribute: IUserAttribute) => Promise<void>
}

const EditAttribute = ({ attribute, loading, editUserAttribute }: Props) => {
  const [editingAttribute, setEditingAttribute] = useState(attribute)

  const onSubmit = ({ collection, name, ...value }: Dictionary<any>) => {
    editUserAttribute({ ...editingAttribute, collection, name, value })
  }
  const validate = ({ collection, name, ...value }: Dictionary<any>) => {
    setEditingAttribute({ ...editingAttribute, collection, name, value })

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

  return (
    <Container direction="column">
      <StyledHeader>Editing {editingAttribute.name}</StyledHeader>
      <AttributeCard collectionName={editingAttribute.collection}>
        <Attribute
          attribute={editingAttribute}
          leftIcon={
            <ActionIcon
              name={attribute.attribute_type.actions[0].icon}
              width="2.5em"
              fill="var(--brand-primary)"
              clickable
              onClick={() => {}}
            />
          }
          rightIcon={
            <ActionIcon
              name={attribute.attribute_type.actions[2].icon}
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
          collection: attribute.collection,
          name: attribute.name,
          ...attribute.value
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

export default connect(mapStateToProps, { editUserAttribute })(EditAttribute)
