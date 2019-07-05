import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import RePlusFAB from '../Button/RePlusFAB'
import ReProfileList from '../Profile/ReProfileList'

const ReContactList = () => {
  const [toShare, setToShare] = useState(false)
  const [selecting, setSelecting] = useState(false)

  if (toShare) return <Redirect push to="/share" />
  return (
    <>
      <ReProfileList listType="contacts" onSelecting={setSelecting} />
      {!selecting && <RePlusFAB onClick={() => setToShare(true)} />}
    </>
  )
}

export default ReContactList
