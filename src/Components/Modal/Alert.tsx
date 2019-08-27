import React from 'react'
import ReactDOM from 'react-dom'

import MdClose from 'react-ionicons/lib/MdClose'
import Notification from '../Util/Notification'
import FlexBox from '../Layout/FlexBox'

import styles from './Modal.module.scss'

type Props = {
  close: () => {}
  type: 'info' | 'success' | 'warning' | 'danger'
  header?: string
  children: Array<React.ReactChild>
}

const Alert = ({ close, type, header, children }: Props) => {
  setTimeout(() => close(), 6000)
  return ReactDOM.createPortal(
    <div className={styles.Alert}>
      <Notification type={type}>
        <Notification.Header>
          <FlexBox>
            {header ? header : type.charAt(0).toUpperCase() + type.slice(1)}
            <MdClose fontSize="2em" color="white" />
          </FlexBox>
        </Notification.Header>

        <Notification.Body>{children}</Notification.Body>
      </Notification>
    </div>,
    document.querySelector('#alert-root')!
  )
}

export default Alert
