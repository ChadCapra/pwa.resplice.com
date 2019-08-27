import React from 'react'
import cx from 'classnames'

import Ring from '../Loading/Ring'

import styles from './Button.module.scss'

interface Props {
  type: 'primary' | 'secondary'
  className?: string
  loading?: boolean
  disabled?: boolean
  submit?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactChild
}

/**
 * Primary Button for Resplice. Used on forms, in modals, etc.
 */
const ReButton = ({
  type,
  className,
  loading,
  disabled,
  submit,
  onClick,
  children
}: Props) => {
  const ButtonStyle = cx(styles.Button, className, {
    [styles.Loading]: loading,
    [styles.Disabled]: disabled,
    [styles.Primary]: type === 'primary',
    [styles.Secondary]: type === 'secondary'
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return
    if (onClick) onClick(e)
  }

  return (
    <button
      className={ButtonStyle}
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
      {loading && <Ring style={{ marginLeft: '8px ' }} />}
    </button>
  )
}

export default ReButton
