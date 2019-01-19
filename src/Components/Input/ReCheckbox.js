import React from 'react'

const ReCheckbox = ({ onCheck, onUncheck, checked }) => {
  if (checked) {
    return <div className="checkbox-checked" />
  }
  return <div className="checkbox" />
}

export default ReCheckbox
