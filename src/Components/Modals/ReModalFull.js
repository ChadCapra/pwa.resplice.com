import React from 'react'
import ReactDOM from 'react-dom'

import Modal from 'react-bulma-components/lib/components/modal'
import Container from 'react-bulma-components/lib/components/container'

import './modal.scss'

const ReModalFull = ({ show, close, modal, children }) => {
  return ReactDOM.createPortal(
    <Modal
      className="modal-container-full"
      show={show}
      onClose={close}
      {...modal}
    >
      <Modal.Content>
        <Container className="modal-children-full">{children}</Container>
      </Modal.Content>
    </Modal>,
    document.querySelector('#modal-root')
  )
}

export default ReModalFull
