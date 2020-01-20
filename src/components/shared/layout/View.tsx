import React from 'react'

import styled from 'styled-components'

const ViewLayout = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
`
const ViewHeader = styled.header`
  flex: 0;
`
const ViewBody = styled.main`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

type Props = {
  children: React.ReactNode
}

const Header = ({ children }: Props) => <ViewHeader>{children}</ViewHeader>

const Body = ({ children }: Props) => <ViewBody>{children}</ViewBody>

const Layout = ({ children }: Props) => (
  <ViewLayout id="view">{children}</ViewLayout>
)

export default {
  Layout,
  Header,
  Body
}
