import React, { Component } from 'react'

export default class RenderIcon extends Component {
  state = {
    module: null
  }

  componentDidMount() {
    const { icon } = this.props
    // Dynamically import from react-ionicons library
    import(`react-ionicons/lib/${icon}`).then(module =>
      this.setState({ module: module.default })
    )
  }

  render() {
    const { color, fontSize } = this.props
    const { module: Component } = this.state
    return Component && <Component color={color} fontSize={fontSize} />
  }
}
