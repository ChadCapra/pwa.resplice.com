import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 2em 0;
`
const Code = styled.h1`
  font-size: 4em;
  font-weight: bold;
`

const InviteCode = () => {
  return (
    <Container>
      <Code>345-123</Code>
    </Container>
  )
}

export default InviteCode
