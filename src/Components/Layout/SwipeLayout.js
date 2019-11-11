import React, { Component } from 'react'
import qs from 'query-string'
import { withRouter } from 'react-router-dom'

import View from './View'
import FlexBox from './FlexBox'
import ReactSwipe from 'react-swipe'

import cx from 'classnames'
import styles from './Layout.module.scss'
import './overrides.scss'

const SwipeLayoutNav = ({ menus, swipeIndex, handleNavClick }) => {
  return (
    <FlexBox direction="row" justify="around" align="center">
      {menus.map((menu, idx) => {
        const SwipeNavStyle = cx(styles.SwipeNav, {
          [styles.Active]: parseInt(swipeIndex) === idx
        })
        return (
          <FlexBox
            key={idx}
            direction="column"
            justify="center"
            align="center"
            onClick={() => handleNavClick(idx)}
            style={{ cursor: 'pointer' }}
          >
            <span>{menu}</span>
            <div className={SwipeNavStyle} />
          </FlexBox>
        )
      })}
    </FlexBox>
  )
}

const SwipeLayoutBody = React.memo(
  React.forwardRef(({ swipeIndex, callback, body }, ref) => {
    return (
      <ReactSwipe
        swipeOptions={{
          startSlide: parseInt(swipeIndex),
          continuous: false,
          callback
        }}
        ref={ref}
      >
        {body.props.children.map((child, idx) => {
          return (
            <div key={idx} className={styles.SwipeContainer}>
              {child}
            </div>
          )
        })}
      </ReactSwipe>
    )
  }),
  () => {
    return true
  }
)

const Header = () => {}
const Body = () => {}

class SwipeLayout extends Component {
  constructor(props) {
    super(props)
    const params = qs.parse(this.props.location.search)
    this.reactSwipeEl = React.createRef()
    this.state = {
      swipeIndex: params.swipeIndex || this.props.swipeIndex
    }
  }
  static Header = Header
  static Body = Body

  handleNavClick = idx => {
    if (idx > this.state.swipeIndex) {
      this.reactSwipeEl.current.swipe.next()
    } else if (idx < this.state.swipeIndex) {
      this.reactSwipeEl.current.swipe.prev()
    }
  }

  render() {
    const { menus, children } = this.props
    const header = children.find(child => child.type === Header)
    const body = children.find(child => child.type === Body)

    return (
      <View>
        <View.Header>
          <div className={styles.SwipeHeader}>
            {header.props.children}
            <SwipeLayoutNav
              menus={menus}
              swipeIndex={this.state.swipeIndex}
              handleNavClick={this.handleNavClick}
            />
          </div>
        </View.Header>

        <View.Body>
          <SwipeLayoutBody
            swipeIndex={this.state.swipeIndex}
            body={body}
            callback={idx => this.setState({ swipeIndex: idx })}
            ref={this.reactSwipeEl}
          />
        </View.Body>
      </View>
    )
  }
}

export default withRouter(SwipeLayout)
