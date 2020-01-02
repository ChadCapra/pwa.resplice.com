import React, { useState } from 'react'

import Camera from '../devices/Camera'

type Props = {
  uuid: string
  onAvatarEdit: (file: any) => void
}

const AvatarUpload = ({ uuid, onAvatarEdit }: Props) => {
  const [openCamera, setOpenCamera] = useState(true)

  return (
    <>
      <div></div>
      {openCamera && (
        <Camera
          onShot={img => console.log(img)}
          onClose={() => setOpenCamera(false)}
        />
      )}
    </>
  )
}

export default AvatarUpload
