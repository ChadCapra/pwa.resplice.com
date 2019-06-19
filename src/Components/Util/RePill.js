import React from 'react'

const RePill = ({ children, selected, ...props }) => {
  return (
    <div className={`re-pill${selected ? ' active' : ''}`} {...props}>
      {children}
    </div>
  )
}

export default RePill
