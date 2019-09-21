import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Form, Field } from 'react-final-form'
import FlexBox from '../Layout/FlexBox'

import Input from '../Form/Input'
import Checkbox from '../Form/Checkbox'
import Button from '../Button/Button'
import InputPhone from '../Form/InputPhone'
import MdHelpCircle from 'react-ionicons/lib/MdHelpCircle'
import Alert from '../Modal/Alert'

import styles from './Auth.module.scss'

import { login, clearError } from '../../state/actions'

type Props = {
  loading: boolean
  session: Session | null
  isAuthorized: boolean
  error: Error | null
  login: AsyncAction
  clearError: Action
}

const Login = ({
  loading,
  session,
  isAuthorized,
  error,
  login,
  clearError
}: Props) => {
  const [locationChecked, setLocationChecked] = useState(false)
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null)
  useEffect(() => {
    const handleGeoError = (err: any) => {
      console.log(err)
      setLocationChecked(false)
    }
    if (locationChecked && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        setCurrentPosition,
        handleGeoError,
        { enableHighAccuracy: true }
      )
    }
  }, [locationChecked])

  const handleLocationCheck = () => {
    if (locationChecked) {
      setCurrentPosition(null)
    }
    setLocationChecked(!locationChecked)
  }

  const onSubmit = async (values: LoginValues) => {
    login(values, currentPosition)
  }
  const validate = (values: LoginValues): Dictionary => {
    const errors: Dictionary = {}
    if (!values.phone) {
      errors.phone = 'Phone Required'
    }
    if (values.phone && values.phone.replace(/\D/g, '').length < 8) {
      errors.phone = 'You must enter a valid phone number'
    }
    if (!values.email) {
      errors.email = 'Email Required'
    }
    return errors
  }

  if (session) return <Redirect to="/auth/verify" />
  if (isAuthorized) return <Redirect to="/" />

  return (
    <>
      {error && (
        <Alert type="danger" header={error.name} close={clearError}>
          {error.message}
        </Alert>
      )}

      <FlexBox
        direction="column"
        justify="start"
        align="center"
        style={{ height: '100%' }}
      >
        <div className={styles.AuthSubtitles}>
          <p>Welcome to the world's most up-to-date address book!</p>
        </div>

        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, pristine }) => {
            return (
              <form className={styles.LoginForm} onSubmit={handleSubmit}>
                <Field name="phone">
                  {props => (
                    <InputPhone
                      {...props.input}
                      type="phone"
                      label="Mobile Phone"
                      defaultCountry="us"
                      meta={props.meta}
                      autoFocus
                    />
                  )}
                </Field>
                <Field name="email">
                  {props => (
                    <Input
                      {...props.input}
                      type="email"
                      label="Email Address"
                      meta={props.meta}
                    />
                  )}
                </Field>

                <FlexBox>
                  <Checkbox
                    checked={locationChecked}
                    onClick={handleLocationCheck}
                  />
                </FlexBox>

                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  disabled={pristine}
                  style={{ marginTop: '15%' }}
                >
                  Start
                </Button>
              </form>
            )
          }}
        />

        <FlexBox
          className={styles.LoginHelpIcon}
          justify="center"
          align="center"
          onClick={() => window.open('https://www.resplice.com/faq', '_blank')}
        >
          <MdHelpCircle fontSize="3em" color="#1bbc9b" />
        </FlexBox>
      </FlexBox>
    </>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    loading: state.authState.loading,
    session: state.authState.session,
    isAuthorized: state.authState.isAuthorized,
    error: state.authState.error
  }
}

export default connect(
  mapStateToProps,
  { login, clearError }
)(Login)
