import React, { Component } from 'react'
import { connect } from 'react-redux'

import Level from 'react-bulma-components/lib/components/level'
import Icon from 'react-bulma-components/lib/components/icon'

import ProfilePic from './ProfilePic'
import UserAttributeCard from '../Cards/UserAttributeCard'
import AttributeCardList from '../Cards/AttributeCardList'
import { ReactComponent as Shield } from '../../assets/Copper_3.svg'

import './profile.scss'

class ReUserProfile extends Component {
  render() {
    const {
      uuid,
      name,
      avatar,
      unique_contacts,
      total_shares
    } = this.props.profile
    return (
      <div className="user-profile">
        <ProfilePic uuid={uuid} avatar={avatar} />
        <h1 className="user-profile-name">{name}</h1>
        <Level breakpoint="mobile" className="profile-stats">
          <Level.Item>
            <div className="profile-stat">
              <span className="stat">{unique_contacts}</span>
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
              <span className="stat">{total_shares}</span>
              <span className="stat-text">Shares</span>
            </div>
          </Level.Item>
        </Level>
        <AttributeCardList type="user" ListComponent={UserAttributeCard} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.userState.profile
  }
}

export default connect(mapStateToProps)(ReUserProfile)
