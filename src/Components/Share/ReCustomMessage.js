import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ReTextArea from '../Form/ReTextArea'
import ReButton from '../Button/ReButton'

const ReCustomMessage = ({ message, saveMessage }) => {
  const [inviteMessage, setInviteMessage] = useState(message)

  const pristine = inviteMessage === ''
  return (
    <div className="invite-message-container flex-col--center">
      <ReTextArea
        meta={{
          pristine,
          touched: false,
          error: '',
          warning: ''
        }}
        input={{ value: inviteMessage }}
        onChange={e => setInviteMessage(e.target.value)}
        autoFocus
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

ReCustomMessage.propTypes = {
  saveMessage: PropTypes.func.isRequired
}

export default ReCustomMessage
