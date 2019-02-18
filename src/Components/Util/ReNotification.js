import React from 'react'
import Notification from 'react-bulma-components/lib/components/notification'

import ReButton from '../Buttons/ReButton'

const ReNotification = ({ title, children, btnText, type }) => {
  return (
    <Notification color={type} className="notif">
      <div>
        <span className="notif-text">{title}</span>
        <span className="notif-text-2">{children}</span>
      </div>
      <ReButton type="small" width="75px" text={btnText} />
    </Notification>
  )
}

export default ReNotification
