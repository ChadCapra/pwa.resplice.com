import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Columns from 'react-bulma-components/lib/components/columns'
import MdAddCircle from 'react-ionicons/lib/MdAddCircle'
import MdAdd from 'react-ionicons/lib/MdAdd'
import MdMap from 'react-ionicons/lib/MdMap'
import MdText from 'react-ionicons/lib/MdText'
import MdMail from 'react-ionicons/lib/MdMail'

import './button.scss'

// React Hooks state
// const [count, setCount] = useState(0)

class RePlusFAB extends Component {
  state = {
    toRoute: false
  }

  render() {
    const { selected, route } = this.props
    if (selected) {
      return (
        <div className="fab-menu">
          <Columns breakpoint="mobile" gapless style={{ height: '100%' }}>
            <Columns.Column className="fab-menu-item">
              <MdMap color="white" fontSize="3rem" />
            </Columns.Column>
            <Columns.Column className="fab-menu-item">
              <MdText color="white" fontSize="3rem" />
            </Columns.Column>
            <Columns.Column className="fab-menu-item">
              <MdMail color="white" fontSize="3rem" />
            </Columns.Column>
            <Columns.Column className="fab-menu-item">
              <MdAddCircle color="white" fontSize="3rem" />
            </Columns.Column>
          </Columns>
        </div>
      )
    } else if (this.state.toRoute) {
      return <Redirect push to={route} />
    }

    return (
      <div className="fab" onClick={() => this.setState({ toRoute: true })}>
        <MdAdd color="white" fontSize="2.5em" />
      </div>
    )
  }
}

export default RePlusFAB
