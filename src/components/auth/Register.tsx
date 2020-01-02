import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field, FieldProps } from 'formik'

import { RespliceState, Session } from '../../store/store'
import { register } from '../../store/auth/authActions'

import Flex from '../shared/layout/Flex'
import Input from '../shared/form/Input'
import Button from '../shared/button/Button'
import Avatar from '../shared/avatar/Avatar'

import styles from './Auth.module.scss'

type RegisterValues = {
  name: string
  avatar: any
  street_address_1: string
  street_address_2: string
  locality: string
  region: string
  postal_code: string
  country: string
}

type Props = {
  loading: boolean
  error: Dictionary<any> | null
  session: Session | null
  register: (values: RegisterValues) => Promise<void>
}

const Register = ({ loading, error, session, register }: Props) => {
  const handleSubmit = (values: RegisterValues) => {
    register(values)
  }

  const validate = (values: RegisterValues) => {
    const errors: Dictionary<string> = {}
    if (!values.name) {
      errors.name = 'Please enter your full name'
    }
    if (!values.country) {
      errors.country = 'Please enter your country'
    }
    return errors
  }

  if (!session) return <Redirect to="/auth/login" />

  return (
    <Flex fill>
      <Formik
        initialValues={{
          name: '',
          avatar: '',
          street_address_1: '',
          street_address_2: '',
          locality: '',
          region: '',
          postal_code: '',
          country: 'United States'
        }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {formikBag => {
          return (
            <Form className={styles.RegisterForm}>
              <Avatar
                uuid={session.user_uuid || 'resplice'}
                onAvatarEdit={() => {}}
              />
              <h2>Register</h2>
              <Field name="name">
                {({ field, meta }: FieldProps) => (
                  <Input type="text" label="Full Name" {...field} meta={meta} />
                )}
              </Field>
              <Field name="street_address_1">
                {({ field, meta }: FieldProps) => (
                  <Input
                    type="text"
                    label="Street Address"
                    {...field}
                    meta={meta}
                  />
                )}
              </Field>
              <Field name="street_address_2">
                {({ field, meta }: FieldProps) => (
                  <Input
                    type="text"
                    label="Street Address 2"
                    {...field}
                    meta={meta}
                  />
                )}
              </Field>
              <Field name="locality">
                {({ field, meta }: FieldProps) => (
                  <Input
                    type="text"
                    label="City or Locality"
                    {...field}
                    meta={meta}
                  />
                )}
              </Field>
              <Field name="region">
                {({ field, meta }: FieldProps) => (
                  <Input
                    type="text"
                    label="State or Region"
                    {...field}
                    meta={meta}
                  />
                )}
              </Field>
              <Field name="postal_code">
                {({ field, meta }: FieldProps) => (
                  <Input
                    type="text"
                    label="Zip or Postal Code"
                    {...field}
                    meta={meta}
                  />
                )}
              </Field>

              <Flex justify="center">
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  disabled={!formikBag.dirty}
                >
                  Register
                </Button>
              </Flex>
            </Form>
          )
        }}
      </Formik>
    </Flex>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    session: state.authState.session
  }
}

export default connect(mapStateToProps, { register })(Register)
