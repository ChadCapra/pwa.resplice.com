import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import ReInput from '../Input/ReInput'
import ReButton from '../Buttons/ReButton'

import './login.scss'
import './form.scss'

class ReContactUs extends Component {
  state = {
    submitted: false
  }

  onSubmit = formValues => {
    console.log('Submitted', formValues)
    this.setState({ submitted: true })
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
        <p>Let us know how we can help!</p>

        <div className="inputs">
          <Field
            name="phone_or_email"
            type="text"
            label="Phone Number or Email"
            component={ReInput}
          />
          <Field
            name="message"
            type="text"
            label="Your Thoughts"
            placeholder="Please let us know your thoughts"
            component={ReInput}
          />
        </div>

        <ReButton type="primary" text="Share Thoughts" width="200px" />
      </form>
    )
  }

  render() {
    if (this.state.submitted) return <Redirect to="/login/signin" />

    return (
      <div className="re-contact-us">
        {this.renderHeader()}
        {this.renderForm()}
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.phone_or_email) {
    errors.phone_or_email = 'You must enter a phone number or an email address'
  }
  return errors
}

const ContactUs = reduxForm({
  form: 'verify',
  validate
})(ReContactUs)

export default ContactUs
