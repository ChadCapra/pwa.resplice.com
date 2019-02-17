import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { register } from '../../actions'
import Icon from 'react-bulma-components/lib/components/icon'
import HelpCircle from 'react-ionicons/lib/MdHelpCircle'

import ReInput from '../Input/ReInput'
import ReInputPassword from '../Input/ReInputPassword'
import ReInputPhone from '../Input/ReInputPhone'
import ReButton from '../Buttons/ReButton'
import StatusBar from '../Util/StatusBar'
import ReNotification from '../Modals/ReNotification'

import './login.scss'
import './form.scss'
import './signup.scss'

class ReSignUp extends Component {
  state = {
    passStrength: {
      percent: 0,
      color: '#e5bd37'
    },
    showErrors: true
  }

  onSubmit = async ({ email_value, phone_value, name, password }) => {
    const registration = {
      name,
      phone_details: {
        country_code: '',
        phone_number: phone_value,
        extension: ''
      },
      phone_verify_method: 'SMS',
      email_details: {
        email: email_value
      },
      password
    }

    this.props.register(registration)
  }

  determineStrength = (e, pass) => {
    let percent = 0
    if (pass.length >= 12) {
      percent += 50
    } else if (pass.legnth >= 8) {
      percent += 35
    } else if (pass.length >= 6) {
      percent += 20
    }

    const letters = /[a-zA-Z]/.test(pass)
    const numbers = /[0-9]/.test(pass)
    const chars = /\W/.test(pass)

    if (letters) percent += 15
    if (numbers) percent += 15
    if (chars) percent += 20

    let color = ''
    if (percent < 20) {
      color = '#fc3769'
    } else if (percent < 60) {
      color = '#e5bd37'
    } else {
      color = '#1bbc9b'
    }
    this.setState({ passStrength: { percent, color } })
  }

  renderHeader() {
    return (
      <div className="login-header">
        <h1>Welcome!</h1>
      </div>
    )
  }

  renderForm() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form">
        <p>
          Signing up is easy!
          <br />
          Just tell us a couple of things so we can get you all signed up.
        </p>

        <div className="inputs">
          <Field
            name="name"
            placeholder="Enter Name"
            label="Full Name"
            type="text"
            component={ReInput}
          />
          <Field name="phone_value" label="Phone" component={ReInputPhone} />
          <Field
            name="email_value"
            type="email"
            label="Email"
            component={ReInput}
          />
          <Field
            name="password"
            type="password"
            placeholder="Enter Password"
            label="Password"
            onChange={this.determineStrength}
            component={ReInputPassword}
          />
          <StatusBar
            percent={this.state.passStrength.percent}
            color={this.state.passStrength.color}
          />
        </div>

        <ReButton
          type="primary"
          text="Sign Up"
          width="200px"
          loading={this.props.loading}
        />
      </form>
    )
  }

  render() {
    if (this.props.registerValues) {
      return <Redirect to="/login/verify" />
    }

    return (
      <div className="sign-up">
        {this.props.authError && this.state.showErrors && (
          <ReNotification
            type="danger"
            close={() => this.setState({ showErrors: false })}
          >{`${this.props.authError} error`}</ReNotification>
        )}
        {this.renderHeader()}
        {this.renderForm()}

        <Icon size="large" className="help-icon">
          <HelpCircle color="#1bbc9b" fontSize="2.5rem" />
        </Icon>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Your full name is required'
  }
  if (!values.phone_value) {
    errors.phone_value = 'You must enter a phone number'
  }
  if (!values.email_value) {
    errors.email_value = 'You must enter an email address'
  }
  if (!values.password) {
    errors.password = 'You must enter a password'
  }
  return errors
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    registerValues: state.auth.register,
    authError: state.auth.error
  }
}

const signUpForm = reduxForm({
  form: 'signUp',
  validate
})(ReSignUp)

export default connect(
  mapStateToProps,
  { register }
)(signUpForm)
