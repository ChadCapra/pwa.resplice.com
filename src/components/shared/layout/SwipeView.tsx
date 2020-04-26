import React, { useState } from 'react'
import styled from 'styled-components'

import { useQuery } from '../../../helpers'

import View from './View'
import Flex from './Flex'
import Swiper from '../util/Swiper'

const StyledHeader = styled.div`
  padding: 1.5em 1.5em 1em 1.5em;
  background-color: var(--light-1);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NavText = styled.h2<{ active: boolean }>`
  font-size: 2em;
  font-weight: 500;
  color: var(--light-4);
  ${(props) => props.active && 'color: var(--text); transform: scale(1.1);'}
  cursor: pointer;
`

const ViewBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--light-1);
  position: relative;
  overflow: hidden;
`

const ChildContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  box-sizing: border-box;
`

type HeaderProps = {
  navText: Array<string>
  active: number
  children: React.ReactNode
  handleNavClick: (idx: number) => void
}

const SwipeViewHeader = ({
  navText,
  active,
  children,
  handleNavClick
}: HeaderProps) => {
  const activeIdx = active - 1
  return (
    <StyledHeader>
      {children}
      <Flex
        justify="between"
        style={{
          paddingTop: '0.5em',
          width: '100%',
          maxWidth: 'var(--mobile-max-px)'
        }}
      >
        {navText.map((text, idx) => {
          return (
            <NavText
              key={idx}
              active={activeIdx === idx}
              onClick={() => handleNavClick(idx)}
            >
              {text}
            </NavText>
          )
        })}
      </Flex>
    </StyledHeader>
  )
}

type Props = {
  navText: Array<string>
  header?: React.ReactNode
  children: React.ReactNodeArray
}

const SwipeView = ({ navText, header, children }: Props) => {
  const initialPage = useQuery().get('page') || '1'
  const [page, setPage] = useState(parseInt(initialPage))

  return (
    <View.Layout>
      <View.Header>
        <SwipeViewHeader
          navText={navText}
          active={page}
          handleNavClick={() => {}}
        >
          {header}
        </SwipeViewHeader>
      </View.Header>
      <View.Body>
        <ViewBackground>
          <Swiper startPage={page} onSwipe={(idx) => setPage(idx + 1)}>
            {children.map((child, idx) => {
              return <ChildContainer key={idx}>{child}</ChildContainer>
            })}
          </Swiper>
        </ViewBackground>
      </View.Body>
    </View.Layout>
  )
}

export default SwipeView
