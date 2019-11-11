import React from 'react'
import PropTypes from 'prop-types'

import './form.scss'

const ReInputCombo = ({
  input,
  label,
  listName,
  dataList,
  meta: { touched, error }
}) => {
  return (
    <div
      className={`re-input${error && touched ? ' re-input--error' : ''}${
        input.value ? ' re-input--filled' : ''
      }`}
    >
      <label className="re-input-label">{label}</label>
      <input className="re-field" list={listName} {...input} />
      <datalist id={listName}>
        {dataList.map((option, idx) => {
          return <option value={option} key={idx} />
        })}
      </datalist>
    </div>
  )
}

ReInputCombo.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string.isRequired,
  listName: PropTypes.string.isRequired,
  dataList: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired
}

export default ReInputCombo
