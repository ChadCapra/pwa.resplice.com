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

const NavText = styled.h2`
  font-size: 2em;
  font-weight: bold;
  cursor: pointer;
`

const ViewBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--light-1);
`

const ChildContainer = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
  background-color: white;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
`

type HeaderProps = {
  startPage: string
  navText: Array<string>
  children: React.ReactNode
  handleNavClick: (idx: number) => void
}

const SwipeViewHeader = ({
  startPage,
  navText,
  children,
  handleNavClick
}: HeaderProps) => {
  console.log(startPage)

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
            <NavText key={idx} onClick={() => handleNavClick(idx)}>
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
  header: React.ReactNode
  children: React.ReactNodeArray
}

const SwipeView = ({ navText, header, children }: Props) => {
  const query = useQuery()
  const page = query.get('page')

  return (
    <View.Layout>
      <View.Header>
        <SwipeViewHeader
          navText={navText}
          startPage={page || '1'}
          handleNavClick={() => {}}
        >
          {header}
        </SwipeViewHeader>
      </View.Header>
      <View.Body>
        <ViewBackground>
          <Swiper>
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
