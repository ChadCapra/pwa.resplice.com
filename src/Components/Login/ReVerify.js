import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { verifyAttribute } from '../../actions'

import ReInputCode from '../Input/ReInputCode'
import ReButton from '../Buttons/ReButton'

import './login.scss'
import './form.scss'
import './verify.scss'

class ReVerify extends Component {
  state = {
    canceled: false,
    verified: false
  }

  onSubmit = () => {
    this.setState({ canceled: true })
  }

  onChange = (e, code) => {
    if (code.toString().length === 6 && this.props.register) {
      this.props.verifyAttribute(code, this.props.register)
    }
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
          We sent a code to your attribute
          <br />
          Enter the code below to verify
        </p>

        <div className="inputs">
          <Field
            name="code"
            placeholder="Code"
            label="Code"
            type="text"
            onChange={this.onChange}
            component={ReInputCode}
          />
          <a href="/">Resend Code</a>
        </div>

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
    if (this.state.verified) return <Redirect to="/" />

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
  return { register: state.login.register }
}

const validate = values => {
  const errors = {}
  if (!values.code) {
    errors.code = 'You must enter your verification code'
  } else if (values.code.toString().length !== 6) {
    errors.code = 'The code must be 6 digits long'
  }
  return errors
}

const Verify = reduxForm({
  form: 'verify',
  validate
})(ReVerify)

export default connect(
  mapStateToProps,
  { verifyAttribute }
)(Verify)
