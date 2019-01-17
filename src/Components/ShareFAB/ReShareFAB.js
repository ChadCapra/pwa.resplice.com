import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Columns from 'react-bulma-components/lib/components/columns'
import MdAddCircle from 'react-ionicons/lib/MdAddCircle'
import MdMap from 'react-ionicons/lib/MdMap'
import MdText from 'react-ionicons/lib/MdText'
import MdMail from 'react-ionicons/lib/MdMail'

import './sharefab.scss'

// React Hooks state
// const [count, setCount] = useState(0)

class ReShareFAB extends Component {
  state = {
    toShare: false
  }

  render() {
    const { selected } = this.props
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
    } else if (this.state.toShare) {
      return <Redirect push to="/share" />
    }

    return (
      <div className="fab">
        <MdAddCircle
          color="#1bbc9b"
          fontSize="4rem"
          onClick={() => this.setState({ toShare: true })}
        />
      </div>
    )
  }
}

export default ReShareFAB
