import React from 'react'
import { connect } from 'react-redux'
import { Form, Field } from 'react-final-form'
import FlexBox from '../Layout/FlexBox'

import Input from '../Form/Input'
import Button from '../Button/Button'
import ReInputPhone from '../Form/ReInputPhone'
import MdHelpCircle from 'react-ionicons/lib/MdHelpCircle'

import { login } from '../../state/actions'

type Props = {
  loading: boolean
  session: Session
  isAuthorized: boolean
  error: Error
}

const Login = () => {
  const onSubmit = (values: LoginValues) => {
    console.log(values)
  }
  const validate = (values: LoginValues) => {
    const errors: LoginValues = {
      phone: '',
      email: ''
    }
    if (!values.phone) {
      errors.phone = 'Email Required'
    }
    if (!values.email) {
      errors.email = 'Phone Required'
    }
    return errors
  }

  return (
    <FlexBox>
      <p>Welcome to the world's most up-to-date address book.</p>
      <p>Start by entering your phone or email</p>

      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              {/* <Field name="phone">
                {props => (
                  <ReInputPhone
                    {...props.input}
                    label="Mobile Phone"
                    defaultCountry="us"
                  />
                )}
              </Field> */}
              <Field name="email">
                {props => (
                  <Input
                    {...props.input}
                    type="email"
                    label="Email Address"
                    meta={props.meta}
                  />
                )}
              </Field>

              <Button type="primary" submit>
                Submit
              </Button>
            </form>
          )
        }}
      />
    </FlexBox>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    loading: state.authState.loading,
    session: state.authState.session,
    isAuthorized: state.authState.isAuthorized,
    error: state.authState.error
  }
}

export default connect(
  mapStateToProps,
  { login }
)(Login)
