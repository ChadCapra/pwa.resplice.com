import React, { Component } from 'react'

const On = () => {}
const Off = () => {}

interface Props {
  enabled: boolean
  children: any[]
  enable: () => {}
  disable: () => {}
}

class ReSwitchAlt extends Component<Props> {
  static On = On
  static Off = Off

  toggleSwitch = (offSelected: boolean) => {
    if (offSelected) this.props.disable()
    else this.props.enable()
  }

  render() {
    const { enabled, children } = this.props
    const on = children.find(child => child.type === On)
    const off = children.find(child => child.type === Off)

    return (
      <div
        className={`re-switch-alt${enabled ? ' re-switch-alt--active' : ''}`}
      >
        <div className="re-switch-off" onClick={() => this.toggleSwitch(true)}>
          {off ? off.props.children : null}
        </div>
        <div className="re-switch-on" onClick={() => this.toggleSwitch(false)}>
          {on ? on.props.children : null}
        </div>
      </div>
    )
  }
}

export default ReSwitchAlt
