import React, { useState } from 'react'

import Identicon from 'react-identicons'
import MdUpload from 'react-ionicons/lib/MdCloudUpload'

import ReModal from '../../Modal/ReModal'
import AvatarUpload from './ReAvatarUpload'

import './avatar.scss'

type Props = {
  uuid: string
  avatar: string
  viewOnly?: boolean
  editAvatar: (...args: any[]) => any
}

const ReAvatar = ({ uuid, avatar, viewOnly, editAvatar }: Props) => {
  const [showAvatarModal, setShowModal] = useState(false)

  return (
    <div
      className="avatar"
      onClick={() => (!viewOnly ? setShowModal(true) : null)}
    >
      {avatar ? (
        <div className="pic" style={{ backgroundImage: `url(${avatar})` }} />
      ) : (
        <Identicon string={uuid} size={85} />
      )}

      {!viewOnly && (
        <>
          <MdUpload
            color="#1bbc9b"
            fontSize="2.5em"
            className="avatar-upload-icon"
          />

          <ReModal
            show={showAvatarModal}
            headerText="Upload"
            onClose={() => setShowModal(false)}
          >
            <AvatarUpload
              uuid={uuid}
              editAvatar={editAvatar}
              onComplete={() => {
                console.log('close Modal')
                setShowModal(false)
              }}
            />
          </ReModal>
        </>
      )}
    </div>
  )
}

export default ReAvatar
