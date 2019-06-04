import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'
import { swiped } from '../actions'

import ReUserProfile from './Profile/ReUserProfile'
import ReUserSettings from './Profile/ReUserSettings'
import RePlusFAB from './Buttons/RePlusFAB'
import ReHeader from './Header/ReHeader'

import './Profile/profile.scss'

class ReUserView extends Component {
  constructor(props) {
    super(props)
    this.swipe = React.createRef()
  }

  componentWillMount() {
    this.props.swiped(0)
  }

  render() {
    if (this.props.loading) return ''

    return (
      <div className="user">
        <ReHeader menus={['Profile', 'Settings']} exitRoute={'/'} />
        <div className="user-body">
          <ReactSwipe
            className="swipe-nav"
            swipeOptions={{
              startSlide: 0,
              continuous: false,
              callback: idx => this.props.swiped(idx)
            }}
            ref={this.swipe}
          >
            <div className="swipe-nav-item-container">
              <ReUserProfile />
              <RePlusFAB route="/profile/add-attribute" />
            </div>
            <div className="swipe-nav-item-container">
              <ReUserSettings />
            </div>
          </ReactSwipe>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.userState.loading
  }
}

export default connect(
  mapStateToProps,
  { swiped }
)(ReUserView)
