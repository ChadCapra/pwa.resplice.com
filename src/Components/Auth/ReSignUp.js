import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { register } from '../../actions'

import ReAuthHeader from './ReAuthHeader'
import ReInput from '../Input/ReInput'
import ReInputCountry from '../Input/ReInputCountry'
import ReInputRegion from '../Input/ReInputRegion'
import ReButton from '../Buttons/ReButton'
import ReAlert from '../Modals/ReAlert'
import ProfilePic from '../Profile/ProfilePic'

class ReSignUp extends Component {
  state = {
    showErrors: true
  }

  onSubmit = formValues => {
    this.props.register(formValues)
  }

  showAvatarModal = () => {}

  renderForm() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form">
        {/* <p>
          Signing up is easy!
          <br />
          Just tell us a couple of things so we can get you all signed up.
        </p> */}

        <div style={{ margin: '25px 0' }}>
          <ProfilePic uuid={this.props.uuid} onClick={this.showAvatarModal} />
        </div>

        <div className="inputs">
          <Field
            name="name"
            type="text"
            label="Full Name"
            component={ReInput}
          />

          <div className="input-row">
            <Field
              name="date_of_birth"
              type="date"
              label="Date of Birth"
              component={ReInput}
            />
            <Field
              name="country"
              type="text"
              label="Select Country"
              component={ReInputCountry}
            />
          </div>

          <Field
            name="street_address_1"
            type="text"
            label="Street Address"
            component={ReInput}
          />
          <Field
            name="street_address_2"
            type="text"
            label="Street Address 2"
            component={ReInput}
          />
          <Field
            name="locality"
            type="text"
            label="City (Locality)"
            component={ReInput}
          />

          <div className="input-row">
            <Field
              name="region"
              type="text"
              label="State (Region)"
              country={this.props.country}
              component={ReInputRegion}
            />
            <Field
              name="postal_code"
              type="text"
              maxLength="8"
              pattern="[a-zA-Z0-9-]+"
              label="Zip (Postal Code)"
              component={ReInput}
            />
          </div>
        </div>

        <ReButton
          type="primary"
          text="Sign Up"
          width="200px"
          loading={this.props.loading}
          disabled={this.props.pristine}
        />
      </form>
    )
  }

  render() {
    if (Object.entries(this.props.registerObject).length > 0)
      return <Redirect to="/" />
    if (this.props.userProfile.name && this.props.isVerified)
      return <Redirect to="/" />

    return (
      <div className="sign-up">
        {this.props.authError && this.state.showErrors && (
          <ReAlert
            type="danger"
            close={() => this.setState({ showErrors: false })}
          >{`${this.props.authError} error`}</ReAlert>
        )}
        <ReAuthHeader>
          <h1>Signup!</h1>
        </ReAuthHeader>

        {this.renderForm()}
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Your full name is required'
  }
  if (!values.date_of_birth) {
    errors.date_of_birth = 'Your date of birth is required'
  }
  if (!values.postal_code) {
    errors.postal_code = 'You must enter a postal code'
  }
  if (!values.country) {
    errors.country = 'You must select a country'
  }
  return errors
}

const selector = formValueSelector('signUp')
const mapStateToProps = state => {
  const country = selector(state, 'country')
  return {
    loading: state.authState.loading,
    registerObject: state.authState.register,
    uuid: '',
    // uuid: state.authState.verify.data.user_uuid || state.userState.profile.uuid,
    authError: state.authState.error,
    userProfile: state.userState.profile,
    isVerified: state.authState.isVerified,
    country
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
