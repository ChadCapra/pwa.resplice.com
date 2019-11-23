import React from 'react'
import cx from 'classnames'

import styles from './Form.module.scss'

type Props = {
  checked: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  [prop: string]: any
}

const Checkbox = ({ checked, onClick, ...props }: Props) => {
  const CheckboxStyle = cx(styles.Checkbox, {
    [styles.Checked]: checked
  })
  // TODO: Use actual input element for accessibility
  return <div className={CheckboxStyle} onClick={onClick} {...props} />
}

export default Checkbox
