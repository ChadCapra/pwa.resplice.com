import React from 'react'
import styled from 'styled-components'

import MdAdd from 'react-ionicons/lib/MdAdd'

const FABStyle = styled.button`
  position: fixed;
  bottom: 1em;
  right: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background-color: var(--brand-primary);
  border-radius: 50%;
  height: 4.2em;
  width: 4.2em;
  cursor: pointer;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);

  &:active {
    transform: scale(0.95);
    box-shadow: none;
  }
`

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const FAB = ({ onClick }: Props) => {
  return (
    <FABStyle onClick={onClick}>
      <MdAdd color="white" fontSize="2em" />
    </FABStyle>
  )
}

export default FAB
