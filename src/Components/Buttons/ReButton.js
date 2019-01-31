import React from 'react'
import './button.scss'

const ReButton = ({ type, text, loading, width, onClick }) => {
  if (loading) {
    return (
      <button style={{ width }} className={`btn btn--${type} btn--loading`}>
        <span>{text}</span>
        <div className="re-ring re-spin" />
      </button>
    )
  }

  return (
    <button style={{ width }} className={`btn btn--${type}`} onClick={onClick}>
      <span>{text}</span>
    </button>
  )
}

export default ReButton
