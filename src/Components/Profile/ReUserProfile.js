import React, { Component } from 'react'
import { connect } from 'react-redux'

import Level from 'react-bulma-components/lib/components/level'
import Icon from 'react-bulma-components/lib/components/icon'

import ProfilePic from './ProfilePic'
import UserAttributeCard from '../Cards/UserAttributeCard'
import { ReactComponent as Shield } from '../../assets/Copper_3.svg'

import './profile.scss'

class ReUserProfile extends Component {
  renderAttributeCards = () => {
    // TODO: change this to use AttributeCardList component
    return Object.keys(this.props.collections).map((col, idx) => {
      return (
        <UserAttributeCard
          key={idx}
          header={col}
          attrs={this.props.collections[col]}
        />
      )
    })
  }

  render() {
    const { name, contactsNum, shares } = this.props.profile
    return (
      <div className="user-profile">
        <ProfilePic />
        <h1 className="user-profile-name">{name}</h1>
        <Level breakpoint="mobile" className="profile-stats">
          <Level.Item>
            <div className="profile-stat">
              <span className="stat">{contactsNum}</span>
              <span className="stat-text">Contacts</span>
            </div>
          </Level.Item>
          <Level.Item>
            <Icon size="large">
              <Shield />
            </Icon>
          </Level.Item>
          <Level.Item>
            <div className="profile-stat">
              <span className="stat">{shares}</span>
              <span className="stat-text">Shares</span>
            </div>
          </Level.Item>
        </Level>
        {this.renderAttributeCards()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    collections: state.user.collections
  }
}

export default connect(mapStateToProps)(ReUserProfile)
