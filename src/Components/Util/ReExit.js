import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import MdClose from 'react-ionicons/lib/MdClose'

import './utils.scss'

class ReExit extends Component {
  state = {
    exit: false
  }

  render() {
    if (this.state.exit) return <Redirect push to="/" />

    return (
      <div className="re-exit">
        <MdClose
          color="#1bbc9b"
          fontSize="2.5em"
          className="re-exit-icon"
          onClick={() => this.setState({ exit: true })}
        />
      </div>
    )
  }
}

export default ReExit
