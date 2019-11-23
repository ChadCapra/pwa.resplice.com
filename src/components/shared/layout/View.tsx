import React, { Component } from 'react'

import styled from 'styled-components'

const View = styled.div`
  height: 100vh;
  width: 100vw;
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
`

type Props = {
  children: Array<React.ReactElement>
}

const Header: React.FC<{}> = () => null
const Body: React.FC<{}> = () => null

export default class ViewLayout extends Component<Props> {
  static Header = Header
  static Body = Body

  render() {
    const { children } = this.props
    const header = children.find(child => child.type === Header)
    const body = children.find(child => child.type === Body)

    return (
      <View id="view">
        {header ? <ViewHeader>{header.props.children}</ViewHeader> : null}
        {body ? <ViewBody>{body.props.children}</ViewBody> : null}
      </View>
    )
  }
}
