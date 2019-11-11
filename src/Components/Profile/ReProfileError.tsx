import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import ReButton from '../Button/ReButton'

const ReProfileError = () => {
  const [goBack, setGoBack] = useState(false)

  if (goBack) return <Redirect to="/" />

  return (
    <div className="flex-col--center" style={{ height: '100%' }}>
      Something went wrong when loading this profile
      <ReButton type="primary" onClick={() => setGoBack(true)}>
        Go Back
      </ReButton>
    </div>
  )
}

export default ReProfileError
