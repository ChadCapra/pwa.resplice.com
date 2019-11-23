import React from 'react'

import styled from 'styled-components'

type Props = {
  children: React.ReactNode
  className?: string
  fill?: boolean
  direction?: 'column' | 'row'
  justify?:
    | 'center'
    | 'start'
    | 'end'
    | 'between'
    | 'around'
    | 'evenly'
    | 'stretch'
    | 'normal'
  align?: 'center' | 'start' | 'end' | 'stretch' | 'normal'
  [prop: string]: any
}

type StyleProps = {
  fill?: boolean
  direction?: 'column' | 'row'
  justify?: string
  align?: string
}

const renderJustify = (justify: string | undefined) => {
  switch (justify) {
    case 'center':
      return 'justify-content: center;'
    case 'start':
      return 'justify-content: flex-start;'
    case 'end':
      return 'justify-content: flex-end;'
    case 'between':
      return 'justify-content: space-between;'
    case 'around':
      return 'justify-content: space-around;'
    case 'evenly':
      return 'justify-content: space-evenly;'
    case 'stretch':
      return 'justify-content: stretch;'
    case 'normal':
      return 'justify-content: normal;'
    default:
      return ''
  }
}

const renderAlign = (align: string | undefined) => {
  switch (align) {
    case 'center':
      return 'align-items: center;'
    case 'start':
      return 'align-items: flex-start;'
    case 'end':
      return 'align-items: flex-end;'
    case 'stretch':
      return 'align-items: stretch;'
    case 'normal':
      return 'align-items: normal;'
    default:
      return ''
  }
}

const FlexBox = styled.div<StyleProps>`
  display: flex;
  position: relative;
  ${props => (props.fill ? 'height: 100%; width: 100%' : '')}
  ${props =>
    props.direction === 'column'
      ? 'flex-direction: column;'
      : props.direction === 'row'
      ? 'flex-direction: row;'
      : ''}
  ${props => renderJustify(props.justify)}
  ${props => renderAlign(props.align)}
`

const Flex = (props: Props) => {
  return <FlexBox {...props}>{props.children}</FlexBox>
}

export default Flex
