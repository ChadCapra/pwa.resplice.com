import React from 'react'
import './button.scss'

const ReButton = ({ type, text, loading, width }) => {
  if (loading) {
    return <button className={`btn btn--${type}`}>Loading...</button>
  }

  return (
    <button style={{ width }} className={`btn btn--${type}`}>
      {text}
    </button>
  )
}

export default ReButton
