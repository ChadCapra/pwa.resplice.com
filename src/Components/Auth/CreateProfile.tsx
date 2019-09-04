import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Field } from 'react-final-form'

import Input from '../Form/Input'
import InputCountry from '../Form/ReInputCountry'
import InputRegion from '../Form/ReInputRegion'
import Button from '../Button/Button'
import Alert from '../Modal/Alert'

import { createProfile, clearError } from '../../state/actions'
import FlexBox from '../Layout/FlexBox'

type Props = {
  profile: UserProfile | null
  createProfile: AsyncAction
  clearError: Action
  loading: boolean
  error: Error | null
}

const CreateProfile = ({
  profile,
  createProfile,
  clearError,
  loading,
  error
}: Props) => {
  return (
    <>
      {error && (
        <Alert type="danger" header={error.name} close={clearError}>
          {error.message}
        </Alert>
      )}

      <FlexBox>
        <div>Create Profile</div>
      </FlexBox>
    </>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    profile: state.userState.profile
  }
}

export default connect(
  mapStateToProps,
  { createProfile, clearError }
)(CreateProfile)
