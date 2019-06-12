import React, { useState } from 'react'

import ReTextArea from '../Input/ReTextArea'
import ReButton from '../Buttons/ReButton'

const ReCustomMessage = ({ saveMessage }) => {
  const [inviteMessage, setInviteMessage] = useState(
    "Welcome to Re/splice!\n\n\n\nLet's connect,\n\nBastilla"
  )

  const pristine =
    inviteMessage === "Welcome to Re/splice!\n\n\n\nLet's connect,\n\nBastilla"
  return (
    <div className="invite-message-container flex-col--center">
      <ReTextArea
        label="Tap to enter your message"
        meta={{
          pristine,
          touched: false,
          error: '',
          warning: ''
        }}
        input={{ value: inviteMessage }}
        onChange={e => setInviteMessage(e.target.value)}
        onFocus={e => {
          e.target.setSelectionRange(23, 23)
        }}
      />

      <ReButton
        style={{ marginTop: '25px' }}
        type="primary"
        text="Save"
        onClick={() => saveMessage(inviteMessage)}
        disabled={pristine}
      />
    </div>
  )
}

export default ReCustomMessage
