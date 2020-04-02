import React from 'react'
import { AttributeAction } from '../../../store/store'
import styled from 'styled-components'

import ActionIcon from '../util/ActionIcon'

type Props = {
  attributeName: string
  attributeActions: AttributeAction[]
  onActionClick: (actionName: string) => void
}

const ContextContainer = styled.div`
  max-width: 575px;
  width: 100%;
  height: 100%;
  overflow: auto;
  margin: auto;
  box-sizing: border-box;
`
const ContextHeader = styled.h2`
  padding: 1em;
  border-bottom: 1px solid var(--light-2);
`
const ContextOption = styled.button<{ danger: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  outline: none;
  border: none;
  padding: 1em;
  border-radius: 10px;
  background-color: ${props =>
    props.danger ? 'var(--danger-light)' : 'white'};
  cursor: pointer;

  &:active {
    background-color: var(--light-2);
    p {
      transform: scale(0.9);
    }
  }

  & p {
    margin-left: 0.5em;
    font-size: 1.5em;
    color: ${props => (props.danger ? 'var(--danger)' : 'var(--text)')};
  }
`

const AttributeContext = ({
  attributeName,
  attributeActions,
  onActionClick
}: Props) => {
  return (
    <ContextContainer>
      <ContextHeader>{attributeName}</ContextHeader>
      <div style={{ padding: '1em' }}>
        {attributeActions.map((action, idx) => {
          return (
            <ContextOption
              key={idx}
              danger={action.name === 'delete'}
              onClick={() => onActionClick(action.name)}
            >
              <ActionIcon
                name={action.icon}
                width="2.5em"
                fill={
                  action.name === 'delete'
                    ? 'var(--danger)'
                    : 'var(--brand-primary)'
                }
                clickable
              />
              <p>{action.display_name}</p>
            </ContextOption>
          )
        })}
      </div>
    </ContextContainer>
  )
}

export default AttributeContext
