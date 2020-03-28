import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'

import MdClose from 'react-ionicons/lib/MdClose'

import styles from './Modal.module.scss'

type Props = {
  show: boolean
  height?: string
  children: React.ReactNode
  onClose: () => void
}

const Modal = ({ show, onClose, height = '75%', children }: Props) => {
  const [closing, setClosing] = useState(false)

  const animateAndClose = () => {
    setClosing(true)
    setTimeout(() => {
      onClose()
      setClosing(false)
    }, 300)
  }

  const ModalStyle = cx(styles.ModalContent, {
    [styles.ModalClosing]: closing
  })

  return show
    ? ReactDOM.createPortal(
        <div className={styles.ModalContainer}>
          <div
            className={styles.ModalBackground}
            onClick={() => animateAndClose()}
          />
          <div className={ModalStyle} style={{ height }}>
            <div className={styles.ModalExit} onClick={() => animateAndClose()}>
              <MdClose color="#1bbc9b" fontSize="2.5em" />
            </div>
            {children}
          </div>
        </div>,
        document.querySelector('#modal-root')!
      )
    : null
}

export default Modal
