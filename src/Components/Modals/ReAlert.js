import React from 'react'
import ReactDOM from 'react-dom'

import Notification from 'react-bulma-components/lib/components/notification'
import Button from 'react-bulma-components/lib/components/button'

import './modal.scss'

const ReNotification = ({ type, children, close }) => {
  // setTimeout(() => close(), 6000)
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

export default ReNotification
