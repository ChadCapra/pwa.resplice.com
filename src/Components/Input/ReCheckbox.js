import React from 'react'

const ReCheckbox = ({ onCheck, onUncheck, checked }) => {
  if (checked) {
    return <div className="checkbox-checked" onClick={onUncheck} />
  }
  return <div className="checkbox" onClick={onCheck} />
}

export default ReCheckbox
