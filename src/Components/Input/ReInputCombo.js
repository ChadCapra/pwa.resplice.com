import React from 'react'

import './input.scss'

const ReInputCombo = ({ input, label, name, listName, dataList }) => {
  return (
    <div className="re-input-container">
      <label className="re-input-label">{label}</label>
      <input className="re-input" list={listName} name={name} {...input} />
      <datalist id={listName}>
        {dataList.map((option, idx) => {
          return <option value={option} key={idx} />
        })}
      </datalist>
    </div>
  )
}

export default ReInputCombo
