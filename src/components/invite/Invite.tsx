import React, { useState } from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode.react'
import CameraIcon from '../../assets/camera-reverse.svg'

import Flex from '../shared/layout/Flex'
import Scanner from './Scanner'
import InviteCode from './InviteCode'
import InviteSearch from './InviteSearch'
import Button from '../shared/button/Button'
import Modal from '../shared/modal/Modal'

const Container = styled(Flex)`
  height: 100%;
  padding: 2em;
  margin: auto;
  overflow: auto;
  max-width: ${props => props.theme['mobile-max-width']};
  box-sizing: border-box;
`

const CodeContainer = styled(Flex)`
  border-radius: 2em;
  background-color: var(--brand-primary);
  height: initial;
  width: 75%;
  padding: 2.5em;
  box-shadow: var(--card-shadow-3);

  & img {
    color: white;
  }
  &:active {
    transform: scale(0.95);
  }
`

const Text = styled.p`
  text-align: center;
  padding-bottom: 2em;

  & span {
    font-weight: bold;
    color: black;
  }
`

const Invite = () => {
  const [showScanner, setShowScanner] = useState(false)
  const [showInviteSearch, setShowInviteSearch] = useState(false)

  return (
    <Container direction="column" justify="center" align="center">
      <Text>
        Have someone scan your code with the <span>Resplice App</span> and enter
        the code below for a quick share.
      </Text>
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
      <Button variant="primary" onClick={() => setShowInviteSearch(true)}>
        Invite
      </Button>

      <Modal
        show={showInviteSearch}
        height="100%"
        onClose={() => setShowInviteSearch(false)}
      >
        <InviteSearch />
      </Modal>
    </Container>
  )
}

export default Invite
