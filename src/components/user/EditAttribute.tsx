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

  const onSubmit = (values: Dictionary<any>) => {
    editUserAttribute({ ...editingAttribute, ...values })
  }
  const validate = (values: Dictionary<any>) => {
    const { collection, name, ...value } = values
    setEditingAttribute({ ...editingAttribute, collection, name, value })

    const errors: Dictionary<string> = {}
    if (!values.collection) {
      errors.collection = 'Please select or enter a collection name'
    }
    if (!values.name) {
      errors.name = 'Please enter an attribute name'
    }
    if (values.phone && values.phone.length < 3) {
      errors.phone = 'Please enter a phone number'
    }
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
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
