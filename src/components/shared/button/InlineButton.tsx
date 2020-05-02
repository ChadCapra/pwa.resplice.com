import React from 'react'
import styled from 'styled-components'

import Ring from '../../skeleton/Ring'

type Props = {
  className?: string
  loading?: boolean
  disabled?: boolean
  onClick?: (e: React.PointerEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  [prop: string]: any
}

const StyledButton = styled.button<Props>`
  display: flex;
  flex: none;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 2em;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  text-align: center;
  transition: all 0.1s ease-out;
  color: white;
  background-color: ${props =>
    props.disabled ? 'var(--light-3)' : 'var(--brand-primary)'};
  padding: 0.25em 0.75em;

  &:active {
    color: white;
    transform: scale(0.9);
    background-color: darken(#1bbc9b, 5%);
  }
`

const InlineButton = ({
  loading,
  disabled,
  onClick,
  children,
  ...props
}: Props) => {
  return (
    <StyledButton disabled={disabled || loading} onClick={onClick} {...props}>
      {loading ? <Ring style={{ marginLeft: '16px' }} /> : children}
    </StyledButton>
  )
}

export default InlineButton
