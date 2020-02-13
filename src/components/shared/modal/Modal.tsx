import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'

import MdClose from 'react-ionicons/lib/MdClose'

import styles from './Modal.module.scss'

type Props = {
  show: boolean
  full?: boolean
  children: React.ReactNode
  onClose: () => void
}

const Modal = ({ show, onClose, full = false, children }: Props) => {
  const [closing, setClosing] = useState(false)

  const animateAndClose = () => {
    setClosing(true)
    setTimeout(() => {
      onClose()
      setClosing(false)
    }, 300)
  }

  const ModalStyle = cx(styles.ModalContent, {
    [styles.Full]: full,
    [styles.ModalClosing]: closing
  })

  return show
    ? ReactDOM.createPortal(
        <div className={styles.ModalContainer}>
          <div
            className={styles.ModalBackground}
            onClick={() => animateAndClose()}
          />
          <div className={ModalStyle}>
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
