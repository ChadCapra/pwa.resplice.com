import React, { Component } from 'react'

import Alert from '../Modal/Alert'

class AuthErrorBoundary extends Component {
  state = {
    error: null
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error, errorInfo)
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <Alert type="danger" header="Error" close={this.clearError}>
            {this.state.error}
          </Alert>
          There was an unhandled exception
        </>
      )
    }

    return this.props.children
  }
}

export default AuthErrorBoundary
