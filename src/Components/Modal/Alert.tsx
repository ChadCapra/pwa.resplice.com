import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import MdClose from 'react-ionicons/lib/MdClose'
import Notification from '../Util/Notification'
import FlexBox from '../Layout/FlexBox'

import styles from './Modal.module.scss'

type Props = {
  close: () => void
  type: 'info' | 'success' | 'warning' | 'danger'
  header?: string
  children: React.ReactNode | Array<React.ReactNode>
}

const Alert = ({ close, type, header, children }: Props) => {
  useEffect(() => {
    const timeout = setTimeout(close, 10000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return ReactDOM.createPortal(
    <div className={styles.Alert}>
      <Notification type={type}>
        <Notification.Header>
          <FlexBox justify="between" align="start">
            <h2 style={{ margin: '0', fontSize: '24px' }}>
              {header ? header : type.charAt(0).toUpperCase() + type.slice(1)}
            </h2>
            <MdClose fontSize="1.5em" color="white" onClick={close} />
          </FlexBox>
        </Notification.Header>

        <Notification.Body>{children}</Notification.Body>
      </Notification>
    </div>,
    document.querySelector('#alert-root')!
  )
}

export default Alert
