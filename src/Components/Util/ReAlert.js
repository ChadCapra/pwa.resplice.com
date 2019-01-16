import React from 'react'
import Notification from 'react-bulma-components/lib/components/notification'

import ReButton from '../Buttons/ReButton'

const ReAlert = ({ text1, text2, btnText, type }) => {
  return (
    <Notification color={type} className="notif">
      <div>
        <span className="notif-text">{text1}</span>
        <span className="notif-text-2">{text2}</span>
      </div>
      <ReButton type="small" width="75px" text={btnText} />
    </Notification>
  )
}

export default ReAlert
