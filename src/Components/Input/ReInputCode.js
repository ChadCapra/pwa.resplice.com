import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MdClose from 'react-ionicons/lib/MdClose'
import MdCheck from 'react-ionicons/lib/MdCheckmark'
import Ripple from '../Loading/Ripple'

import './input.scss'

const RenderIcon = ({ loading, verified, error }) => {
  return (
    (loading && <Ripple className="code-verifying" />) ||
    (verified && (
      <MdCheck className="re-input-icon" color="#1bbc9b" fontSize="2.5rem" />
    )) ||
    (error && (
      <MdClose className="re-input-icon" color="#fc3769" fontSize="2.5rem" />
    )) ||
    ''
  )
}

class ReInputCode extends Component {
  state = {
    code: ['', '', '', '', '', '']
  }

  processInput = (e, inputNum) => {
    const inputs = document.getElementById(this.props.name).children
    const code = [...this.state.code]
    let val = e.target.value.replace(/\D/, '')
    const oldVal = code[inputNum]
    code[inputNum] = val
    this.setState({ code })

    for (let idx = 0; idx < inputs.length; idx++) {
      if (inputs[idx] === e.target && val && inputs[idx + 1]) {
        inputs[idx + 1].tagName.toLowerCase() === 'span'
          ? inputs[idx + 2].focus()
          : inputs[idx + 1].focus()
        inputs[idx + 1].focus()
      }

      if (inputs[idx] === e.target && oldVal && !val) {
        if (idx > 0) {
          inputs[idx - 1].focus()
        }
      }
    }

    this.checkIfComplete(code)
  }

  checkIfComplete = codeArr => {
    const code = codeArr.join('')
    if (codeArr.every(val => val !== '')) {
      this.props.onComplete(code)
    }
  }

  render() {
    const { name, label, loading, verified, focus, error } = this.props

    return (
      <div className="re-code-input-container">
        <label className="re-code-input-label">{label}</label>
        <div className="re-code-inputs" id={name}>
          <input
            type="text"
            placeholder="_"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength="1"
            value={this.state.code[0]}
            autoFocus={focus}
            onChange={e => this.processInput(e, 0)}
          />
          <input
            type="text"
            placeholder="_"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength="1"
            value={this.state.code[1]}
            onChange={e => this.processInput(e, 1)}
          />
          <input
            type="text"
            placeholder="_"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength="1"
            value={this.state.code[2]}
            onChange={e => this.processInput(e, 2)}
          />
          <span className="input-code-dash">-</span>
          <input
            type="text"
            placeholder="_"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength="1"
            value={this.state.code[3]}
            onChange={e => this.processInput(e, 3)}
          />
          <input
            type="text"
            placeholder="_"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength="1"
            value={this.state.code[4]}
            onChange={e => this.processInput(e, 4)}
          />
          <input
            type="text"
            placeholder="_"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength="1"
            value={this.state.code[5]}
            onChange={e => this.processInput(e, 5)}
          />
        </div>

        <RenderIcon loading={loading} verified={verified} error={error} />
      </div>
    )
  }
}

ReInputCode.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  verified: PropTypes.bool,
  focus: PropTypes.bool,
  error: PropTypes.object
}

export default ReInputCode
