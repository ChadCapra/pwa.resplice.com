import React from 'react'
import './button.scss'

const ReButton = ({ type, text, loading, width, onClick }) => {
  if (loading) {
    return <button className={`btn btn--${type}`}>Loading...</button>
  }

  return (
    <button style={{ width }} className={`btn btn--${type}`} onClick={onClick}>
      {text}
    </button>
  )
}

export default ReButton
