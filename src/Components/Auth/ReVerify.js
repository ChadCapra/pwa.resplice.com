import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { verifyAttributes, logout } from '../../actions'

import ReAuthHeader from './ReAuthHeader'
import ReInputCode from '../Input/ReInputCode'
import ReButton from '../Buttons/ReButton'

class ReVerify extends Component {
  state = {
    verify_token_1: null,
    verify_token_2: null
  }

  onPhoneComplete = code => {
    this.setState({ verify_token_1: parseInt(code) })

    if (Object.entries(this.props.login).length > 0) {
      const verifyObject = {
        uuid: this.props.login.ok.uuid,
        verify_token_1: parseInt(code),
        verify_token_2: this.state.verify_token_2
      }
      this.props.verifyAttributes(verifyObject)
    }
  }

  onEmailComplete = code => {
    this.setState({ verify_token_2: parseInt(code) })

    if (Object.entries(this.props.login).length > 0) {
      const verifyObject = {
        uuid: this.props.login.ok.uuid,
        verify_token_1: this.state.verify_token_1,
        verify_token_2: parseInt(code)
      }
      this.props.verifyAttributes(verifyObject)
    }
  }

  render() {
    if (Object.entries(this.props.login).length <= 0)
      return <Redirect to="/auth/login" />
    if (this.props.authorized) return <Redirect to="/" />
    if (this.props.verified) return <Redirect to="/auth/create-profile" />

    let tokenOneVerified = false,
      tokenOneError = false
    let tokenTwoVerified = false,
      tokenTwoError = false

    if (Object.entries(this.props.verify).length) {
      tokenOneVerified = this.props.verify.ok.token_1_valid
      tokenOneError =
        this.state.verify_token_1 &&
        !this.props.verify.ok.token_1_valid &&
        !this.props.verifying
      tokenTwoVerified = this.props.verify.ok.token_2_valid
      tokenTwoError =
        this.state.verify_token_2 &&
        !this.props.verify.ok.token_2_valid &&
        !this.props.verifying
    }

    return (
      <div className="re-verify">
        <ReAuthHeader>
          <h2>Verify</h2>
        </ReAuthHeader>

        <div className="form">
          <p>
            We just need to verify some info!
            <br />
            Please verify your attributes
            <br />
            {this.props.login.values.phone} & {this.props.login.values.email}
          </p>
          <div className="inputs">
            <ReInputCode
              name="phone_verify_token"
              label="Verification Code #1"
              onComplete={this.onPhoneComplete}
              loading={this.state.verify_token_1 && this.props.verifying}
              verified={tokenOneVerified}
              error={tokenOneError}
              focus
            />
            <ReInputCode
              name="email_verify_token"
              label="Verification Code #2"
              onComplete={this.onEmailComplete}
              loading={this.state.verify_token_2 && this.props.verifying}
              verified={tokenTwoVerified}
              error={tokenTwoError}
            />
          </div>
          <ReButton
            type="secondary"
            text="Cancel"
            width="200px"
            onClick={this.props.logout}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.authState.login,
    verify: state.authState.verify,
    verified: state.authState.isVerified,
    verifying: state.authState.loading,
    authorized: state.authState.isAuthorized
  }
}

export default connect(
  mapStateToProps,
  { verifyAttributes, logout }
)(ReVerify)
