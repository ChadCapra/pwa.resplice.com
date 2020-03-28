import React, { useRef } from 'react'
import cx from 'classnames'

import styles from './Form.module.scss'

type Props = {
  checked: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  [prop: string]: any
}

const Checkbox = ({
  name,
  label,
  checked,
  onChange,
  style,
  ...props
}: Props) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const CheckboxStyle = cx(styles.Checkbox, {
    [styles.Checked]: checked
  })
  return (
    <div
      className={styles.CheckboxContainer}
      style={style}
      onClick={() => inputEl.current!.click()}
    >
      <div className={CheckboxStyle} />
      <input
        ref={inputEl}
        className={styles.CheckboxInput}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      {label && (
        <label htmlFor={name} style={{ cursor: 'pointer', marginLeft: '1em' }}>
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox
