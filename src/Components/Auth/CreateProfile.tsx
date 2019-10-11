import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Field } from 'react-final-form'

import FlexBox from '../Layout/FlexBox'
import Input from '../Form/Input'
import InputCountry from '../Form/InputCountry'
import InputRegion from '../Form/InputRegion'
import Avatar from '../Profile/Avatar/ReAvatar'
import Button from '../Button/Button'
import Alert from '../Modal/Alert'

import styles from './Auth.module.scss'

import { completeProfile, clearError } from '../../state/actions'

type Props = {
  session: Session | null
  completeProfile: AsyncAction
  clearError: Action
  loading: boolean
  error: Error | null
}

type CreateProfileValues = {
  name: string
  avatar: string
  street_address_1: string
  street_address_2: string
  locality: string
  region: string
  postal_code: string
  country: string
  date_of_birth: string
}

const CreateProfile = ({
  session,
  completeProfile,
  clearError,
  loading,
  error
}: Props) => {
  const [avatar, setAvatar] = useState('')
  const validate = (values: CreateProfileValues): Dictionary => {
    const errors: Dictionary = {}
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

  if (!session || !session.authenticated_at)
    return <Redirect to="/auth/login" />
  if (session.profile_complete) return <Redirect to="/" />

  return (
    <>
      {error && (
        <Alert type="danger" header={error.name} close={clearError}>
          {error.message}
        </Alert>
      )}

      <FlexBox direction="column" justify="start" align="center">
        <div className={styles.AuthSubtitles}>
          <p>Add some other pieces of information to get started</p>
        </div>

        <Avatar uuid={session.uuid} avatar={avatar} editAvatar={setAvatar} />

        <Form
          onSubmit={completeProfile}
          validate={validate}
          render={({ handleSubmit, pristine }) => {
            return (
              <form
                className={styles.CreateProfileForm}
                onSubmit={handleSubmit}
              >
                <Field name="name">
                  {props => (
                    <Input
                      {...props.input}
                      type="text"
                      label="Full Name"
                      meta={props.meta}
                      autoFocus
                    />
                  )}
                </Field>

                <Field name="date_of_birth">
                  {props => (
                    <Input
                      {...props.input}
                      type="date"
                      label="Date of Birth"
                      meta={props.meta}
                    />
                  )}
                </Field>

                <Field name="country">
                  {props => (
                    <InputCountry
                      {...props.input}
                      type="text"
                      label="country"
                      meta={props.meta}
                    />
                  )}
                </Field>

                <Field name="street_address_1">
                  {props => (
                    <Input
                      {...props.input}
                      type="text"
                      label="Street Address 1"
                      meta={props.meta}
                      autoFocus
                    />
                  )}
                </Field>

                <Field name="street_address_2">
                  {props => (
                    <Input
                      {...props.input}
                      type="text"
                      label="Street Address 2"
                      meta={props.meta}
                      autoFocus
                    />
                  )}
                </Field>

                <Field name="locality">
                  {props => (
                    <Input
                      {...props.input}
                      type="text"
                      label="City (Locality)"
                      meta={props.meta}
                      autoFocus
                    />
                  )}
                </Field>

                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  disabled={pristine}
                  style={{ marginTop: '15%' }}
                >
                  Sign Up
                </Button>
              </form>
            )
          }}
        ></Form>
      </FlexBox>
    </>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    session: state.authState.session
  }
}

export default connect(
  mapStateToProps,
  { completeProfile, clearError }
)(CreateProfile)
