import React from 'react'

const RePill = ({ children, isActive, ...props }) => {
  return (
    <div className={`re-pill${isActive ? ' re-pill--active' : ''}`} {...props}>
      {children}
    </div>
  )
}

export default RePill
