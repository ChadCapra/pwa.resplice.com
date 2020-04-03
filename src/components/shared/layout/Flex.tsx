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
  grow?: boolean
  [prop: string]: any
}

type StyleProps = {
  widthFill?: boolean
  flexDirection?: 'column' | 'row'
  justify?: string
  align?: string
  grow?: boolean
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
  ${props => (props.widthFill ? 'width: 100%; height: 100%;' : '')}
  ${props =>
    props.flexDirection === 'column'
      ? 'flex-direction: column;'
      : props.flexDirection === 'row'
      ? 'flex-direction: row;'
      : ''}
  ${props => renderJustify(props.justify)}
  ${props => renderAlign(props.align)}
  ${props => props.grow && 'flex: 1 1 0px;'}
`

const Flex = ({ direction, fill, justify, align, grow, ...props }: Props) => {
  return (
    <FlexBox
      flexDirection={direction}
      widthFill={fill}
      {...{ justify, align, grow }}
      {...props}
    >
      {props.children}
    </FlexBox>
  )
}

export default Flex
