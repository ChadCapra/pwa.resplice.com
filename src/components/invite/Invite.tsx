import React, { useState } from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode.react'
import CameraIcon from '../../assets/camera-reverse.svg'

import Flex from '../shared/layout/Flex'
import Scanner from './Scanner'
import InviteCode from './InviteCode'

const Container = styled(Flex)`
  height: 100%;
  padding: 0 2em;
  margin: auto;
  max-width: ${props => props.theme['mobile-max-width']};
  box-sizing: border-box;
`

const CodeContainer = styled(Flex)`
  border-radius: 2em;
  background-color: var(--brand-primary);
  height: initial;
  width: 75%;
  padding: 2.5em;

  & img {
    color: white;
  }
  &:active {
    transform: scale(0.95);
  }
`

const Invite = () => {
  const [showScanner, setShowScanner] = useState(false)

  return (
    <Container direction="column" justify="center" align="center">
      <CodeContainer
        id="QRCodeContainer"
        justify="center"
        align="center"
        onClick={() => setShowScanner(!showScanner)}
      >
        {showScanner ? (
          <Scanner />
        ) : (
          <QRCode
            value="http://facebook.github.io/react/"
            bgColor="#1bbc9b"
            fgColor="white"
            style={{ width: '100%', height: '100%' }}
            imageSettings={{
              src: CameraIcon,
              height: 24,
              width: 24,
              excavate: true
            }}
          />
        )}
      </CodeContainer>

      <InviteCode />
    </Container>
  )
}

export default Invite
