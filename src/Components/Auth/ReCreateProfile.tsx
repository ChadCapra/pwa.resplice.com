import React, { FC } from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { loadApplication, createProfile } from '../../state/actions'

import ReAuthHeader from './Header/ReAuthHeader'
import ReInput from '../Form/ReInput'
import ReInputCountry from '../Form/ReInputCountry'
import ReInputRegion from '../Form/ReInputRegion'
import ReButton from '../Button/ReButton'
import ReAlert from '../Modal/ReAlert'
import ReAvatar from '../Profile/Avatar/ReAvatar'

interface Props {
  profile: UserProfile | null
  handleSubmit(fn: Action): () => {}
}

const ReCreateProfile: FC<Props> = ({ profile, handleSubmit }) => {}

class ReCreateProfile extends Component {
  state = {
    showErrors: true
  }

  onSubmit = (formValues: CreateProfileValues) => {
    this.props.createProfile(formValues)
  }

  renderForm() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form">
        {/* <p>
          Signing up is easy!
          <br />
          Just tell us a couple of things so we can get you all signed up.
        </p> */}

        <div style={{ margin: '25px 0' }}>
          <ReAvatar uuid={this.props.profile.uuid} />
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
          loading={this.props.loading}
          disabled={this.props.pristine}
        >
          Create Profile
        </ReButton>
      </form>
    )
  }

  render() {
    if (this.props.profileLoading) return 'loading'
    if (!this.props.isVerified) return <Redirect to="/auth/login" />

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

const validate = (formValues: CreateProfileValues) => {
  const errors = {}
  if (!formValues.name) {
    errors.name = 'Your full name is required'
  }
  if (!formValues.date_of_birth) {
    errors.date_of_birth = 'Your date of birth is required'
  }
  if (!formValues.postal_code) {
    errors.postal_code = 'You must enter a postal code'
  }
  if (!formValues.country) {
    errors.country = 'You must select a country'
  }
  return errors
}

const selector = formValueSelector('createProfile')
const mapStateToProps = (state: RespliceState) => {
  const country = selector(state, 'country')
  return {
    loading: state.authState.loading,
    profileLoading: state.userState.loading,
    profile: state.userState.profile,
    authError: state.authState.error,
    isVerified: state.authState.isVerified,
    country
  }
}

const createProfileForm = reduxForm({
  form: 'createProfile',
  validate
})(ReCreateProfile)

export default connect(
  mapStateToProps,
  { createProfile, loadApplication }
)(createProfileForm)
