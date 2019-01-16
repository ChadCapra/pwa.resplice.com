import React from 'react'

import { ReactComponent as RespliceLogo } from '../../assets/resplice_logo_alt.svg'

const ComingSoon = ({ name }) => {
  return (
    <div className="coming-soon">
      <RespliceLogo className="coming-soon-logo" />
      <h1 className="coming-soon-text">{name} Coming Soon</h1>
    </div>
  )
}

export default ComingSoon
