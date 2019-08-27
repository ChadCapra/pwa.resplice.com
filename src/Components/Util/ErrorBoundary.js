import React, { Component } from 'react'

import Alert from '../Modal/Alert'

export default class ErrorBoundary extends Component {
  state = {
    error: null
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return (
        <Alert type="danger" header="Error" close={this.clearError}>
          {this.state.error}
        </Alert>
      )
    }

    return this.props.children
  }
}
