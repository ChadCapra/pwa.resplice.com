import React from 'react'

const ReContactShares = ({ profile: { name } }) => {
  return (
    <div className="re-contact-shares">
      <h1>
        <span>2</span> shares with {name}
      </h1>
    </div>
  )
}

export default ReContactShares
