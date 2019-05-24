import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { verifyAttributes } from '../../actions'

import ReAuthHeader from './ReAuthHeader'
import ReInputCode from '../Input/ReInputCode'
import ReButton from '../Buttons/ReButton'

class ReVerify extends Component {
  state = {
    canceled: false,
    verifying: false,
    verified: false,
    verifyFailed: false,
    phone_verify_token: null,
    email_verify_token: null
  }

  onSubmit = () => {
    this.setState({ canceled: true })
  }

  onPhoneChange = (e, code) => {
    if (code.length === 7) {
      this.setState({ phone_verify_token: code }, () => {
        if (
          this.state.phone_verify_token &&
          this.state.email_verify_token &&
          this.props.register.data
        ) {
          this.verify()
        }
      })
    }
  }

  onEmailChange = (e, code) => {
    if (code.length === 7) {
      this.setState({ email_verify_token: code }, () => {
        console.log(this.props.register.data)
        if (
          this.state.phone_verify_token &&
          this.state.email_verify_token &&
          this.props.register.data
        ) {
          this.verify()
        }
      })
    }
  }

  verify = () => {
    const verifyObject = {
      uuid: this.props.register.data.uuid,
      phone_verify_token: parseInt(
        this.state.phone_verify_token.replace(/[^\d]/g, '')
      ),
      email_verify_token: parseInt(
        this.state.email_verify_token.replace(/[^\d]/g, '')
      )
    }
    console.log('verify')
    this.props.verifyAttributes(verifyObject)
  }

  render() {
    if (this.state.canceled) return <Redirect to="/auth/login" />
    if (this.props.verified) return <Redirect to="/" />

    return (
      <div className="re-verify">
        <ReAuthHeader>
          <h2>Verify</h2>
        </ReAuthHeader>

        <div className="form">
          <p>
            You are almost signed up.
            <br />
            We just need to verify some info!
          </p>
          <div className="inputs">
            <ReInputCode
              name="phone_verify_token"
              label="Verification Code #1"
              focus
            />
            <ReInputCode
              name="email_verify_token"
              label="Verification Code #2"
            />
          </div>
          <ReButton
            type="secondary"
            text="Cancel"
            width="200px"
            onClick={() => this.setState({ canceled: true })}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    register: state.authState.register,
    verifying: state.authState.loading,
    verified: state.authState.verify
  }
}

export default connect(
  mapStateToProps,
  { verifyAttributes }
)(ReVerify)
