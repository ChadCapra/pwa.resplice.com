import React from 'react'

import HomeHeader from './domain/HomeHeader'

const Sandbox = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: '1.5em',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ width: '100%', maxWidth: '575px' }}>
        <HomeHeader />
      </div>
    </div>
  )
}

export default Sandbox
