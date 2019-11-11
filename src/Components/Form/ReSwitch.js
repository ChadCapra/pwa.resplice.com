import React from 'react'

const ReSwitch = ({ enabled, enable, disable }) => {
  const toggleSwitch = () => {
    if (enabled) disable()
    else enable()
  }
  return (
    <div
      className={`re-switch${enabled ? ' re-switch--active' : ''}`}
      onClick={toggleSwitch}
    >
      <div className="re-switch-inner" />
    </div>
  )
}

export default ReSwitch
