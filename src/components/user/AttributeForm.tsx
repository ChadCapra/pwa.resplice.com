import React from 'react'
import { Formik, Form, Field, FieldProps } from 'formik'

import Input from '../shared/form/Input'
import InputPhone from '../shared/form/InputPhone'
import Button from '../shared/button/Button'

type FormValues = {
  collection: string
  name: string
  [key: string]: any
}

type Props = {
  initialValues: FormValues
  loading: boolean
  validate: (values: FormValues) => void
  onSubmit: (values: FormValues) => void
}

const AttributeForm = ({
  initialValues,
  loading,
  validate,
  onSubmit
}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      validateOnChange
      initialTouched={{ collection: true, name: true }}
      validate={validate}
      onSubmit={onSubmit}
    >
      {formikBag => (
        <Form>
          <Field name="collection">
            {({ field, form: { touched }, meta }: FieldProps) => (
              <Input
                type="text"
                label="Attribute Collection"
                {...field}
                meta={{ ...meta, touched: !!touched[field.name] }}
              />
            )}
          </Field>
          <Field name="name">
            {({ field, meta }: FieldProps) => (
              <Input
                type="text"
                label="Attribute Name"
                {...field}
                meta={meta}
              />
            )}
          </Field>
          {Object.keys(initialValues).map(key => {
            switch (key) {
              case 'phone':
                return (
                  <Field key={key} name={key}>
                    {({ field, meta }: FieldProps) => (
                      <InputPhone
                        label="Phone Number"
                        {...field}
                        meta={meta}
                        onChange={val => formikBag.setFieldValue(key, val)}
                      />
                    )}
                  </Field>
                )
              case 'email':
                return (
                  <Field key={key} name={key}>
                    {({ field, meta }: FieldProps) => (
                      <Input
                        type="email"
                        label="Email Address"
                        {...field}
                        meta={meta}
                      />
                    )}
                  </Field>
                )
              case 'date':
                return (
                  <Field key={key} name={key}>
                    {({ field, meta }: FieldProps) => (
                      <Input
                        type="date"
                        label="Date of Event"
                        {...field}
                        meta={meta}
                      />
                    )}
                  </Field>
                )
              case 'text':
                return (
                  <Field key={key} name={key}>
                    {({ field, meta }: FieldProps) => (
                      <Input
                        type="text"
                        label="Enter Text"
                        {...field}
                        meta={meta}
                      />
                    )}
                  </Field>
                )
              default:
                return null
            }
          })}

          <Button
            type="submit"
            variant="primary"
            style={{ margin: 'auto' }}
            disabled={!formikBag.dirty}
          >
            {loading ? 'Saving' : 'Save'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default AttributeForm
