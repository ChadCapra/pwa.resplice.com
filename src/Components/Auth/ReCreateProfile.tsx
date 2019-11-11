import React, { FC } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Field,
  InjectedFormProps,
  reduxForm,
  formValueSelector
} from 'redux-form'
import { connect } from 'react-redux'
import { loadApplication, completeProfile } from '../../state/actions'

import ReInput from '../Form/ReInput'
import ReInputCountry from '../Form/ReInputCountry'
import ReInputRegion from '../Form/ReInputRegion'
import ReButton from '../Button/ReButton'
import ReAvatar from '../Profile/Avatar/ReAvatar'

interface Props {
  profile: UserProfile | null
  loading: boolean
  pristine: boolean
  session: Session | null
  isAuthorized: boolean
  country: string
  completeProfile: AsyncAction
  handleSubmit(fn: AsyncAction): () => {}
}

const ReCreateProfile: FC<Props & InjectedFormProps<{}, Props>> = ({
  profile,
  loading,
  pristine,
  session,
  isAuthorized,
  country,
  completeProfile,
  handleSubmit
}) => {
  if (!session) return <Redirect to="/auth/login" />
  if (isAuthorized) return <Redirect to="/" />

  return (
    <div className="create-profile">
      <form onSubmit={handleSubmit(completeProfile)} className="form">
        {/* <p>
          Signing up is easy!
          <br />
          Just tell us a couple of things so we can get you all signed up.
        </p> */}

        <div style={{ margin: '25px 0' }}>
          <ReAvatar
            uuid={profile!.uuid}
            avatar={profile!.avatar}
            editAvatar={() => {}}
          />
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
              country={country}
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

        <ReButton type="primary" loading={loading} disabled={pristine}>
          Create Profile
        </ReButton>
      </form>
    </div>
  )
}

const validate = (formValues: CreateProfileValues) => {
  const errors: any = {}
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
    session: state.authState.session,
    isAuthorized: state.authState.isAuthorized,
    profile: state.userState.profile,
    country
  }
}

const createProfileForm = reduxForm<{}, Props>({
  form: 'createProfile',
  validate
})(ReCreateProfile)

export default connect(
  mapStateToProps,
  { completeProfile, loadApplication }
)(createProfileForm)
