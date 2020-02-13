import React from 'react'
import cx from 'classnames'

import { CountryDropdown } from 'react-country-region-selector'

import styles from './Form.module.scss'

type Props = {
  defaultCountry?: string
  name: string
  value: string
  label: string
  meta: {
    pristine?: boolean
    touched?: boolean
    error?: string
    warning?: boolean
  }
  onChange: (val: string) => void
}

const CountrySelect = ({
  name,
  value,
  label,
  meta: { error, touched },
  onChange
}: Props) => {
  const InputStyle = cx(styles.Input, {
    [styles.Error]: error && touched,
    [styles.Filled]: value
  })
  const FieldStyle = cx(styles.Field, styles.CountryOverride)

  return (
    <div className={InputStyle}>
      <label className={styles.Label}>{label}</label>
      <CountryDropdown
        classes={FieldStyle}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default CountrySelect
