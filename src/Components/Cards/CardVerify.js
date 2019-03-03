import React from 'react'

const CardVerify = ({ type, handleClick }) => {
  switch (type) {
    case 'verified':
      return (
        <div className="card-verify green-border" onClick={handleClick}>
          <span>V</span>
        </div>
      )
    case 'unverified':
      return (
        <div className="card-verify red-border" onClick={handleClick}>
          <span>U</span>
        </div>
      )
    case 'pending':
      return (
        <div className="card-verify yellow-border" onClick={handleClick}>
          <span>P</span>
        </div>
      )
    default:
      return <div />
  }
}

export default CardVerify
