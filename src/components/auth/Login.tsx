import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Formik, Form, Field, FieldProps } from 'formik'
import styled from 'styled-components'
import { RespliceState, Session } from '../../store/store'
import { createSession } from '../../store/auth/authActions'

import Flex from '../shared/layout/Flex'
import Input from '../shared/form/Input'
import InputPhone from '../shared/form/InputPhone'
import Checkbox from '../shared/form/Checkbox'
import Button from '../shared/button/Button'

type LoginValues = {
  phone: string
  email: string
  location: string | null
  remember_me: boolean
}

type Props = {
  session: Session | null
  loading: boolean
  error: Dictionary<any> | null
  createSession: (values: LoginValues) => Promise<void>
}

const StyledFlex = styled(Flex)`
  max-width: 768px;
  padding: 1rem 2rem;
`

const Login = ({ session, createSession, loading, error }: Props) => {
  const handleSubmit = (values: LoginValues) => {
    createSession(values)
  }

  const validate = (values: LoginValues) => {
    const errors: Dictionary<string> = {}
    if (!values.phone) {
      errors.phone = 'Please enter a phone number'
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Please enter a valid email address'
    }
    return errors
  }

  if (session && session.uuid) return <Redirect to="/auth/verify" />

  return (
    <StyledFlex direction="column" justify="start">
      <p>Welcome to the world's most up-to-date address book!</p>

      <Formik
        initialValues={{
          phone: '',
          email: '',
          location: null,
          remember_me: false
        }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {formikBag => {
          return (
            <Form>
              <Field name="phone">
                {({ field, meta }: FieldProps) => (
                  <InputPhone
                    label="Mobile Phone"
                    name={field.name}
                    value={field.value}
                    onChange={val => formikBag.setFieldValue('phone', val)}
                    meta={meta}
                  />
                )}
              </Field>

              <Field name="email">
                {({ field, meta }: FieldProps) => (
                  <Input
                    type="email"
                    label="Email Address"
                    {...field}
                    meta={meta}
                  />
                )}
              </Field>

              <Field name="remember_me">
                {({ field, meta }: FieldProps) => (
                  <Checkbox
                    label="Remember Me"
                    checked={field.checked || false}
                    {...field}
                    meta={meta}
                    style={{ margin: '1.5em 0' }}
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
                  Start
                </Button>
              </Flex>
            </Form>
          )
        }}
      </Formik>
    </StyledFlex>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    session: state.authState.session,
    loading: state.authState.loading,
    error: state.authState.error
  }
}

export default connect(mapStateToProps, { createSession })(Login)
