import React from 'react'

import './input.scss'

const ReInputCombo = ({ input, label, name, dataList }) => {
  return (
    <div className="re-input-container">
      <label className="re-input-label">{label}</label>
      <input className="re-input" list={dataList.name} name={name} {...input} />
      <datalist id={dataList.name}>
        {dataList.options.map(option => {
          return <option value={option.value} />
        })}
      </datalist>
    </div>
  )
}

export default ReInputCombo
