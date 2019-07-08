import React from 'react'

interface Props {
  logo: boolean | undefined
  children: any
}

const ReAuthHeader = ({ logo, children }: Props) => {
  return (
    <div className="auth-header">
      {logo && (
        <img
          src={require('../../assets/resplice_logo_alt.svg')}
          alt="Resplice Logo"
          width="80px"
        />
      )}
      {children}
    </div>
  )
}

export default ReAuthHeader
