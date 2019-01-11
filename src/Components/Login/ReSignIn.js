import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { signIn } from '../../actions'
import { Link } from 'react-router-dom'

import Icon from 'react-bulma-components/lib/components/icon'
import HelpCircle from 'react-ionicons/lib/MdHelpCircle'

import ReInput from '../Input/ReInput'
import ReButton from '../Buttons/ReButton'
import './signin.scss'
import './login.scss'
import './form.scss'

class ReSignIn extends Component {
  onSubmit = formValues => {
    this.props.signIn(formValues)
  }

  renderHeader() {
    return (
      <div className="login-header">
        <img
          src={require('../../assets/resplice_logo_alt.svg')}
          alt="Resplice Logo"
          width="100px"
        />
        <h2>Resplice</h2>
      </div>
    )
  }

  renderForm() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form">
        <p>Welcome to the world's most accurate contact directory!</p>

        <div className="inputs">
          <Field
            name="attribute"
            placeholder="Enter Attribute"
            label="Phone Number/Email"
            type="text"
            component={ReInput}
          />
          <Field
            name="password"
            type="password"
            placeholder="Enter Password"
            label="Password"
            component={ReInput}
          />
          <a href="resplice.com" className="forgot-password-link">
            Forgot Password?
          </a>
        </div>

        <ReButton type="primary" text="Login" width="200px" />
      </form>
    )
  }

  render() {
    return (
      <div className="sign-in">
        {this.renderHeader()}
        {this.renderForm()}

        <div className="sign-up-link">
          <Link to="/login/signup">
            Don't have an account?
            <br />
            Sign up here!
          </Link>
          <Icon size="large" className="help-icon">
            <HelpCircle color="#1bbc9b" fontSize="2.5rem" />
          </Icon>
        </div>
      </div>
    )
  }
}

const validate = formValues => {
  const errors = {}

  if (!formValues.attribute) {
    errors.attribute = 'You must enter a phone number or an email'
  }

  if (!formValues.password) {
    errors.password = 'You must enter a password'
  }

  return errors
}

const signInForm = reduxForm({
  form: 'signIn',
  validate
})(ReSignIn)

export default connect(
  null,
  { signIn }
)(signInForm)
