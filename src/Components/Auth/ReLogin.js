import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { login, removeError } from '../../state/actions'
import { Redirect } from 'react-router-dom'

import ReAuthHeader from './Header/ReAuthHeader'
import ReInput from '../Form/ReInput'
import ReButton from '../Button/ReButton'
import ReInputPhone from '../Form/ReInputPhone'
import Icon from 'react-bulma-components/lib/components/icon'
import HelpCircle from 'react-ionicons/lib/MdHelpCircle'

class ReLogin extends Component {
  onSubmit = ({ phone, email }) => {
    const login = {
      phone,
      email
    }
    this.props.login(login)
  }

  renderForm() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form">
        <p>
          Welcome to Resplice, the world's most accurate contact directory!{' '}
          <br />
          Start by entering your phone and email
        </p>

        <div className="inputs">
          <Field
            name="phone"
            type="text"
            label="Mobile Phone"
            component={ReInputPhone}
            defaultCountry="us"
          />
          <Field
            name="email"
            type="email"
            label="Email Address"
            component={ReInput}
          />
        </div>

        <ReButton type="primary" width="200px" loading={this.props.loading}>
          Start
        </ReButton>
      </form>
    )
  }

  render() {
    if (Object.entries(this.props.loginObject).length > 0)
      return <Redirect push to="/auth/verify" />

    return (
      <div className="login">
        <ReAuthHeader logo>
          <h2>Resplice</h2>
        </ReAuthHeader>
        {this.renderForm()}

        <Icon size="large" className="help-icon">
          <HelpCircle color="#1bbc9b" fontSize="2.5rem" />
        </Icon>
      </div>
    )
  }
}

const validate = formValues => {
  const errors = {}

  if (!formValues.phone || formValues.phone.length < 8) {
    errors.phone = 'You must enter a valid phone number'
  }

  if (!formValues.email) {
    errors.email = 'You must enter a valid email address'
  }

  return errors
}

const mapStateToProps = state => {
  return {
    loading: state.authState.loading,
    loginObject: state.authState.login,
    errors: state.authState.error
  }
}

const loginForm = reduxForm({
  form: 'login',
  validate
})(ReLogin)

export default connect(
  mapStateToProps,
  { login, removeError }
)(loginForm)
