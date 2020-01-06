import React from 'react'

import Card from './shared/card/Card'

const Sandbox = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        padding: '1.5em',
        boxSizing: 'border-box'
      }}
    >
      <Card.Container>
        <Card.Header padding="large">Card Header</Card.Header>
        <Card.Body padding="large">Card Body</Card.Body>
      </Card.Container>
    </div>
  )
}

export default Sandbox
