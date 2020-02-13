import React, { useState } from 'react'

import Identicon from 'react-identicons'
import MdUpload from 'react-ionicons/lib/MdCloudUpload'

import Modal from '../modal/Modal'
import AvatarUpload from './AvatarUpload'

import './avatar.scss'
import styles from './Avatar.module.scss'

type Props = {
  uuid: string
  avatar?: string
  viewOnly?: boolean
  onAvatarEdit: (...args: any[]) => any
}

const Avatar = ({ uuid, avatar, viewOnly, onAvatarEdit }: Props) => {
  const [showAvatarModal, setShowModal] = useState(false)

  return (
    <div
      className={styles.Avatar}
      onClick={() => (!viewOnly ? setShowModal(true) : null)}
    >
      {avatar ? (
        <div className="pic" style={{ backgroundImage: `url(${avatar})` }} />
      ) : (
        <Identicon string={uuid} size={85} />
      )}

      {!viewOnly && (
        <>
          <div className={styles.AvatarUploadIcon}>
            <MdUpload color="#1bbc9b" fontSize="2em" />
          </div>

          <Modal show={showAvatarModal} onClose={() => setShowModal(false)}>
            <h2>Avatar Upload</h2>
            <AvatarUpload uuid={uuid} onAvatarEdit={onAvatarEdit} />
          </Modal>
        </>
      )}
    </div>
  )
}

export default Avatar
