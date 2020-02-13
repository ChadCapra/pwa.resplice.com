import React from 'react'
import cx from 'classnames'

import styles from './Form.module.scss'

type Props = {
  checked: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  [prop: string]: any
}

const Checkbox = ({ name, label, checked, onChange, ...props }: Props) => {
  const CheckboxStyle = cx(styles.Checkbox, {
    [styles.Checked]: checked
  })
  // TODO: Use actual input element for accessibility
  // return <div className={CheckboxStyle} onClick={onClick} {...props} />
  return (
    <div className={styles.CheckboxContainer}>
      <div className={CheckboxStyle} />
      <input
        className={styles.CheckboxInput}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={() => onChange(!checked)}
        {...props}
      />
      <label htmlFor={name} style={{ cursor: 'pointer' }}>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
