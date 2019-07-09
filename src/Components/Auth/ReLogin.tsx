import React, { FC } from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { login, removeError } from '../../state/actions'
import { Redirect } from 'react-router-dom'

import ReAuthHeader from './Header/ReAuthHeader'
import ReInput from '../Form/ReInput'
import ReButton from '../Button/ReButton'
import ReInputPhone from '../Form/ReInputPhone'
import HelpCircle from 'react-ionicons/lib/MdHelpCircle'

interface Props {
  loading: boolean
  loginObject: Login | null
  isAuthorized: boolean
  login: AsyncAction
  handleSubmit(fn: AsyncAction): () => {}
}

const ReLogin: FC<Props & InjectedFormProps<{}, Props>> = ({
  loading,
  loginObject,
  isAuthorized,
  handleSubmit,
  login
}) => {
  if (loginObject) return <Redirect to="/auth/verify" />
  if (isAuthorized) return <Redirect to="/" />

  return (
    <div className="login">
      <ReAuthHeader>
        <h2>Resplice</h2>
      </ReAuthHeader>

      <form onSubmit={handleSubmit(login)} className="form">
        <p>
          Welcome to Resplice, the world's most accurate contact directory!
          <br />
          Start by entering your phone and email
        </p>

        <div className="inputs">
          <Field
            name="phone"
            label="Mobile Phone"
            defaultCountry="us"
            component={ReInputPhone}
          />
          <Field
            name="email"
            type="email"
            label="Email Address"
            component={ReInput}
          />
        </div>

        <ReButton type="primary" loading={loading}>
          Start
        </ReButton>
      </form>

      <HelpCircle className="help-icon" color="#1bbc9b" fontSize="2.5rem" />
    </div>
  )
}

const validate = (formValues: LoginValues) => {
  const errors: any = {}

  if (!formValues.phone || formValues.phone.length < 8) {
    errors.phone = 'You must enter a valid phone number'
  }

  if (!formValues.email) {
    errors.email = 'You must enter a valid email address'
  }

  return errors
}

const mapStateToProps = (state: RespliceState) => {
  return {
    loading: state.authState.loading,
    loginObject: state.authState.login,
    isAuthorized: state.authState.isAuthorized,
    errors: state.authState.error
  }
}

const loginForm = reduxForm<{}, Props>({
  form: 'login',
  validate
})(ReLogin)

export default connect(
  mapStateToProps,
  { login, removeError }
)(loginForm)
