import React, { useState, useEffect, useRef } from 'react'
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

const buildModalRoot = () => {
  const root = document.createElement('div')
  root.setAttribute('id', 'modal-root')
  return root
}

const Modal = ({ show, onClose, height = '75%', children }: Props) => {
  const [closing, setClosing] = useState(false)
  const [rootAppended, setRootAppended] = useState(false)
  const ModalRoot = useRef<HTMLDivElement>(buildModalRoot())

  useEffect(() => {
    if (show) {
      document.body.appendChild(ModalRoot.current)
      setRootAppended(true)
    } else {
      setRootAppended(false)
      ModalRoot.current.remove()
    }
  }, [show])

  const animateAndClose = () => {
    setClosing(true)
    setTimeout(() => {
      onClose()
      setClosing(false)
    }, 300)
  }

  const ModalStyle = cx(styles.ModalContent, {
    [styles.ModalClosing]: closing,
    [styles.ModalFull]: height === '100%'
  })

  return show && rootAppended
    ? ReactDOM.createPortal(
        <div className={styles.ModalContainer}>
          <div
            className={styles.ModalBackground}
            onClick={() => animateAndClose()}
          />
          <div className={ModalStyle} style={{ height }}>
            <div className={styles.ModalExit} onClick={() => animateAndClose()}>
              <MdClose color="#1bbc9b" fontSize="2em" />
            </div>
            {children}
          </div>
        </div>,
        document.querySelector('#modal-root')!
      )
    : null
}

export default Modal
