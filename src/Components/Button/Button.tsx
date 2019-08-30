import React from 'react'
import cx from 'classnames'

import Ring from '../Loading/Ring'

import styles from './Button.module.scss'

type Props = {
  type?: 'button' | 'submit'
  variant: 'primary' | 'secondary'
  className?: string
  loading?: boolean
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  [prop: string]: any
}

/**
 * Primary Button for Resplice. Used on forms, in modals, etc.
 */
const Button = ({
  type,
  variant,
  className,
  loading,
  disabled,
  onClick,
  children,
  ...props
}: Props) => {
  const ButtonStyle = cx(styles.Button, className, {
    [styles.Loading]: loading,
    [styles.Disabled]: disabled,
    [styles.Primary]: variant === 'primary',
    [styles.Secondary]: variant === 'secondary'
  })

  return (
    <button
      className={ButtonStyle}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {children}
      {loading && <Ring style={{ marginLeft: '16px' }} />}
    </button>
  )
}

export default Button
