import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { register } from '../../actions'
import Icon from 'react-bulma-components/lib/components/icon'
import HelpCircle from 'react-ionicons/lib/MdHelpCircle'

import ReInput from '../Input/ReInput'
import ReButton from '../Buttons/ReButton'

import './login.scss'
import './form.scss'

class ReAttributes extends Component {
  onSubmit = formValues => {
    console.log(formValues)
    // this.props.register(formValues)
  }

  renderHeader() {
    return (
      <div className="login-header">
        <h1>Congrats!</h1>
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
            name="phone"
            label="Home Phone"
            type="text"
            component={ReInput}
          />
          <Field name="email" label="Email" type="text" component={ReInput} />
          <Field
            name="dob"
            label="Date of Birth"
            type="date"
            component={ReInput}
          />
          <Field
            name="street"
            label="Street Address"
            type="text"
            component={ReInput}
          />
          <Field name="city" label="City" type="text" component={ReInput} />
          <Field name="state" label="State" type="text" component={ReInput} />
          <Field name="zip" label="Zip Code" type="text" component={ReInput} />
        </div>

        <ReButton type="primary" text="Continue" width="200px" />
      </form>
    )
  }

  render() {
    return (
      <div className="attributes-form">
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
  if (!values.phone) {
    errors.phone = 'Please enter a phone number'
  }
  if (!values.email) {
    errors.email = 'Please enter an email address'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const attributesForm = reduxForm({
  form: 'attributes',
  validate
})(ReAttributes)

export default connect(
  null,
  { register }
)(attributesForm)
