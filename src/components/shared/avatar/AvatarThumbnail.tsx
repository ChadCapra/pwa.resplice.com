import React from 'react'
import Identicon from 'react-identicons'

import styled from 'styled-components'

type Props = {
  avatar?: string
  uuid: string
  onClick: (uuid: string) => void
}

const ThumbnailContainer = styled.div`
  height: 50px;
  width: 50px;
  background-color: var(--light-3);
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AvatarThumbnail = ({ avatar, uuid, onClick }: Props) => {
  return (
    <ThumbnailContainer onClick={() => onClick(uuid)}>
      {avatar ? (
        <img src={avatar} alt="Thumbnail" width="50px" height="50px" />
      ) : (
        <Identicon string={uuid} size={28} />
      )}
    </ThumbnailContainer>
  )
}

export default AvatarThumbnail
