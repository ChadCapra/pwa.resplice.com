import React, { Component } from 'react'

const IconLeft = () => {}
const IconRight = () => {}
export default class Attribute extends Component {
  render() {
    const { children } = this.props
    const iconLeft = children.find(child => child.type === IconLeft)
    const iconRight = children.find(child => child.type === IconRight)
    return <div />
  }
}
