import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { verifyAttributes } from '../../actions'

import ReInputCode from '../Input/ReInputCode'
import ReButton from '../Buttons/ReButton'

import './login.scss'
import './form.scss'
import './verify.scss'

class ReVerify extends Component {
  state = {
    canceled: false,
    verifying: false,
    verified: false,
    verifyFailed: false,
    phone_verify_token: null,
    email_verify_token: null
  }

  onSubmit = () => {
    this.setState({ canceled: true })
  }

  codeNormalizer = code => {
    if (!code) return code

    const onlyNums = code.replace(/[^\d]/g, '')
    return onlyNums.length > 3
      ? `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
      : onlyNums
  }

  onPhoneChange = (e, code) => {
    if (code.length === 7) {
      this.setState({ phone_verify_token: code }, () => {
        if (
          this.state.phone_verify_token &&
          this.state.email_verify_token &&
          this.props.register
        ) {
          this.verify()
        }
      })
    }
  }

  onEmailChange = (e, code) => {
    if (code.length === 7) {
      this.setState({ email_verify_token: code }, () => {
        if (
          this.state.phone_verify_token &&
          this.state.email_verify_token &&
          this.props.register
        ) {
          console.log('verifying')
          this.verify()
        }
      })
    }
  }

  verify = () => {
    const verifyObject = {
      uuid: this.props.register.uuid,
      phone_verify_token: this.state.phone_verify_token.replace(/[^\d]/g, ''),
      email_verify_token: this.state.email_verify_token.replace(/[^\d]/g, '')
    }
    console.log(verifyObject)
    this.props.verifyAttributes(verifyObject)
  }

  renderHeader() {
    return (
      <div className="login-header">
        <h1>Verify</h1>
      </div>
    )
  }

  renderForm() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form">
        <p>
          We sent a code to your attributes
          <br />
          Enter the code below to verify
        </p>

        <div className="inputs">
          <Field
            name="phone_verify_token"
            placeholder="Code"
            label="Phone"
            onChange={this.onPhoneChange}
            component={ReInputCode}
            normalize={this.codeNormalizer}
            verifying={this.props.verifying}
            autoFocus
          />
          <a href="/">Resend Code</a>
          <Field
            name="email_verify_token"
            placeholder="Code"
            label="Email"
            onChange={this.onEmailChange}
            component={ReInputCode}
            normalize={this.codeNormalizer}
            verifying={this.props.verifying}
          />
          <a href="/">Resend Code</a>
        </div>

        <a href="/">Phone does not accept text (Call Me)</a>

        <ReButton
          type="secondary"
          text="Cancel"
          width="200px"
          onClick={() => this.setState({ canceled: true })}
        />
      </form>
    )
  }

  render() {
    if (this.state.canceled) return <Redirect to="/login/signin" />
    if (this.props.verified) return <Redirect to="/" />

    return (
      <div className="re-verify">
        {this.renderHeader()}
        <p>
          You are almost signed up.
          <br />
          We just need to verify some info!
        </p>
        {this.renderForm()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    register: state.auth.register,
    isAuthorized: state.auth.isAuthorized,
    verifying: state.auth.loading,
    verified: state.auth.verify
  }
}

const validate = values => {
  const errors = {}
  if (!values.phone_verify_token) {
    errors.phone_verify_token = 'You must enter your verification code'
  } else if (values.phone_verify_token.toString().length !== 7) {
    errors.code = 'The code must be 6 digits long'
  }

  if (!values.email_verify_token) {
    errors.email_verify_token = 'You must enter your verification code'
  } else if (values.email_verify_token.toString().length !== 7) {
    errors.email_verify_token = 'The code must be 6 digits long'
  }
  return errors
}

const Verify = reduxForm({
  form: 'verify',
  validate
})(ReVerify)

export default connect(
  mapStateToProps,
  { verifyAttributes }
)(Verify)
