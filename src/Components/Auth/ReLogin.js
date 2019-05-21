import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { login, removeError } from '../../actions'
import { Link, Redirect } from 'react-router-dom'

import Icon from 'react-bulma-components/lib/components/icon'
import HelpCircle from 'react-ionicons/lib/MdHelpCircle'

import ReInput from '../Input/ReInput'
import ReButton from '../Buttons/ReButton'
import ReAlert from '../Modals/ReAlert'
import './signin.scss'
import './login.scss'
import './form.scss'

class ReLogin extends Component {
  onSubmit = ({ attribute, password }) => {
    const login = {
      phone_or_email: attribute,
      password
    }
    this.props.login(login)
  }

  renderHeader() {
    return (
      <div className="login-header">
        <img
          src={require('../../assets/resplice_logo_alt.svg')}
          alt="Resplice Logo"
          width="80px"
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
          <Link to="/auth/reset-password" className="forgot-password-link">
            Forgot Password?
          </Link>
        </div>

        <ReButton
          type="primary"
          text="Login"
          width="200px"
          loading={this.props.loading}
        />
      </form>
    )
  }

  render() {
    if (this.props.loginObject) return <Redirect push to="/" />

    return (
      <div className="sign-in">
        {this.renderHeader()}
        {this.renderForm()}
        {this.props.errors && (
          <ReAlert
            type="danger"
            title="Error"
            close={() => this.props.removeError()}
          >
            Invalid username/password combo
          </ReAlert>
        )}

        <div className="sign-up-link">
          <Link to="/auth/signup">
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

const mapStateToProps = state => {
  return {
    loading: state.authState.loading,
    loginObject: state.authState.register,
    errors: state.authState.error
  }
}

const loginForm = reduxForm({
  form: 'signIn',
  validate
})(ReLogin)

export default connect(
  mapStateToProps,
  { login, removeError }
)(loginForm)
