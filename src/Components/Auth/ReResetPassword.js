import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { forgotPassword } from '../../actions'

import ReInput from '../Input/ReInput'
import ReInputPassword from '../Input/ReInputPassword'
import ReInputPhone from '../Input/ReInputPhone'
import ReButton from '../Buttons/ReButton'
import StatusBar from '../Util/StatusBar'
import ReAlert from '../Modals/ReAlert'

import './login.scss'
import './form.scss'
import './signup.scss'

class ReResetPassword extends Component {
  state = {
    passStrength: {
      percent: 0,
      color: '#e5bd37'
    },
    showErrors: true
  }

  onSubmit = ({ email, phone, password }) => {
    this.props.forgotPassword({ email, phone, password })
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
        <h1>Reset Password</h1>
      </div>
    )
  }

  renderForm() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form">
        <p>
          Forgot Password?
          <br />
          No problem, just fill out the form below
        </p>

        <div className="inputs">
          <Field name="phone" label="Phone" component={ReInputPhone} />
          <Field name="email" type="email" label="Email" component={ReInput} />
          <Field
            name="password"
            type="password"
            placeholder="Enter New Password"
            label="New Password"
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
          text="Reset Password"
          width="250px"
          loading={this.props.loading}
        />
      </form>
    )
  }

  render() {
    if (this.props.resetPasswordObj) {
      return <Redirect to="/auth/signin" />
    }

    return (
      <div className="sign-in">
        {this.props.authError && this.state.showErrors && (
          <ReAlert
            type="danger"
            close={() => this.setState({ showErrors: false })}
          >{`${this.props.authError} error`}</ReAlert>
        )}
        {this.renderHeader()}
        {this.renderForm()}
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.phone) {
    errors.phone = 'You must enter a phone number'
  }
  if (!values.email) {
    errors.email = 'You must enter an email address'
  }
  if (!values.password) {
    errors.password = 'You must enter a password'
  }
  return errors
}

const mapStateToProps = state => {
  return {
    loading: state.authState.loading,
    resetPasswordObj: state.authState.resetPassword,
    authError: state.authState.error
  }
}

const resetPasswordForm = reduxForm({
  form: 'resetPassword',
  validate
})(ReResetPassword)

export default connect(
  mapStateToProps,
  { forgotPassword }
)(resetPasswordForm)
