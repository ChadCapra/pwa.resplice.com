import React from 'react'

import { ReactComponent as RespliceLogo } from '../../assets/resplice_logo_alt.svg'

import './loading.scss'

const GlobalLoading = () => {
  return (
    <div className="global-loading">
      <RespliceLogo className="global-loading-logo" width="150" height="150" />
    </div>
  )
}

export default GlobalLoading
