import React, { useEffect, useRef } from 'react'
import cx from 'classnames'

import styles from './Form.module.scss'

type Props = {
  name: string
  type?: string
  value: string
  label: string
  meta: {
    touched?: boolean
    error?: string
    warning?: boolean
  }
  autoFocus?: boolean
  component?: React.ReactElement
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  name,
  type,
  value,
  label,
  meta: { touched, error, warning },
  autoFocus,
  component,
  onChange
}: Props) => {
  const field = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (field && field.current && autoFocus) {
      field.current.focus()
    }
  }, [autoFocus])

  const InputStyle = cx(styles.Input, {
    [styles.Error]: error && touched,
    [styles.Filled]: value || type === 'date'
  })
  const LabelStyle = cx(styles.Label, {
    [styles.Phone]: type === 'phone'
  })

  return (
    <div className={InputStyle}>
      <label className={LabelStyle}>{label}</label>
      {component ? (
        React.cloneElement(component, { name, type, value, onChange })
      ) : (
        <input
          ref={field}
          className={styles.Field}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
      {touched &&
        ((error && <span className={styles.ErrorText}>{error}</span>) ||
          (warning && <span className={styles.WarningText}>{warning}</span>))}
    </div>
  )
}

export default Input
