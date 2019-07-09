import React, { FC } from 'react'

import RespliceLogo from '../../../assets/resplice_logo_alt.svg'
import './header.scss'

interface Props {
  children: any
}

const ReAuthHeader: FC<Props> = ({ children }) => {
  return (
    <div className="auth-header">
      <img src={RespliceLogo} alt="Resplice Logo" width="80px" />
      {children}
    </div>
  )
}

export default ReAuthHeader
