import React from 'react'
import './utils.scss'

const StatusBar = ({ percent, color }) => {
  return (
    <div className="bar">
      <div
        className="bar-percent"
        style={{ width: `${percent}%`, backgroundColor: color }}
      />
    </div>
  )
}

export default StatusBar
