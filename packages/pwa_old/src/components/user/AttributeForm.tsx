import React from 'react'
import { IUserAttribute, AttributeType } from '../../store/store'
import { Formik, Form, Field } from 'formik'

import Input from '../shared/form/Input'

type Props = {
  attribute?: IUserAttribute & { attribute_type: AttributeType }
  attributeType: AttributeType
  onSubmit: (values: any) => void
}

const AttributeForm = ({ attribute, attributeType, onSubmit }: Props) => {
  const initialValues = () =>
    attribute
      ? {
          collection: attribute.collection,
          name: attribute.name,
          ...attribute.value
        }
      : {
          collection: '',
          name: '',
          ...attributeType.empty_value
        }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ initialValues }) => (
        <Form>
          <Field type="text" name="collection" component={Input} />
        </Form>
      )}
    </Formik>
  )
}

export default AttributeForm
