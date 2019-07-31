import React, { FC } from 'react'
import './button.scss'

interface Props {
  type: 'primary' | 'secondary'
  loading?: boolean
  disabled?: boolean
  onClick?(e: object): void
  children: import('react').ReactNode
}

/**
 * Primary Button for Resplice. Used on forms, in modals, etc.
 */
const ReButton: FC<Props> = ({
  type,
  loading,
  disabled,
  onClick,
  children,
  ...props
}) => {
  return loading ? (
    <button className={`btn btn--${type} btn--loading`} disabled {...props}>
      {children}
      <div className="re-ring re-spin" />
    </button>
  ) : disabled ? (
    <button className={`btn btn--${type} btn--disabled`} disabled {...props}>
      {children}
    </button>
  ) : (
    <button className={`btn btn--${type}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default ReButton
