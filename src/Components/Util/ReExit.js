import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import MdClose from 'react-ionicons/lib/MdClose'

import './utils.scss'

const ReExit = ({ exitRoute }) => {
  const [exit, setExit] = useState(false)

  if (exit) return <Redirect push to={exitRoute} />

  return (
    <MdClose
      color="#1bbc9b"
      fontSize="2.5em"
      className="re-exit-icon"
      onClick={() => setExit(true)}
    />
  )
}

ReExit.propTypes = {
  exitRoute: PropTypes.string.isRequired
}

export default ReExit
