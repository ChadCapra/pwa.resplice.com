import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import MdClose from 'react-ionicons/lib/MdClose'

import './modal.scss'

const ReModal = ({ show, onClose, full, headerText, children }) => {
  const contentNode = useRef()

  const handleOutsideClick = e => {
    if (!contentNode.current.contains(e.target)) {
      animateAndClose()
    }
  }

  const animateAndClose = () => {
    contentNode.current.classList.add('modal-close')
    setTimeout(() => onClose(), 300)
  }

  useEffect(() => {
    if (show) {
      // add event listener when mounted
      document.addEventListener('click', handleOutsideClick)
    } else {
      document.removeEventListener('click', handleOutsideClick)
    }

    // remove event listener on unmount
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return show
    ? ReactDOM.createPortal(
        <div className="modal-container">
          <div
            ref={contentNode}
            className={`modal-content${full ? '--full' : ''}`}
          >
            <div className="modal-exit-icon" onClick={() => animateAndClose()}>
              <MdClose color="#1bbc9b" fontSize="2.5em" />
            </div>
            <div className="modal-children">
              {headerText && <h1 className="modal-header">{headerText}</h1>}
              {children}
            </div>
          </div>
        </div>,
        document.querySelector('#modal-root')
      )
    : null
}

ReModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  full: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func
  ])
}

export default ReModal
