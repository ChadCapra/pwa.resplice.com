import React from 'react'
import ReactDOM from 'react-dom'

import Notification from 'react-bulma-components/lib/components/notification'
import Button from 'react-bulma-components/lib/components/button'

import './modal.scss'

const ReAlert = ({ close, type, children }) => {
  setTimeout(() => close(), 6000)
  return ReactDOM.createPortal(
    <div className="alert-container">
      <Notification color={type}>
        {children}
        <Button remove onClick={() => close()} />
      </Notification>
    </div>,
    document.querySelector('#alert-root')
  )
}

export default ReAlert
