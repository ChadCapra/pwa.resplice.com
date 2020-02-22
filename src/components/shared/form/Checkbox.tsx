import React from 'react'
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
  const CheckboxStyle = cx(styles.Checkbox, {
    [styles.Checked]: checked
  })
  console.log(onChange)
  return (
    <div className={styles.CheckboxContainer} style={style}>
      <div className={CheckboxStyle} />
      <input
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
