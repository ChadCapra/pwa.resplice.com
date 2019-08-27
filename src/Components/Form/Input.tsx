import React, { useEffect, useRef } from 'react'
import cx from 'classnames'

import styles from './Form.module.scss'

type Props = {
  name: string
  type: string
  value: string
  label: string
  meta: {
    pristine?: boolean
    touched?: boolean
    error?: boolean
    warning?: boolean
  }
  autoFocus?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  name,
  type,
  value,
  label,
  meta: { touched, error, warning },
  autoFocus,
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

  return (
    <div className={InputStyle}>
      <label className={styles.Label}>{label}</label>
      <input
        ref={field}
        className={styles.Field}
        name={name}
        type={type}
        onChange={onChange}
      />
      {touched &&
        ((error && <span className="input-error-text">{error}</span>) ||
          (warning && <span className="input-warning-text">{warning}</span>))}
    </div>
  )
}

export default Input
