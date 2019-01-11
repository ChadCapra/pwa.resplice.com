import React, { Component } from 'react'
import Level from 'react-bulma-components/lib/components/level'
import Icon from 'react-bulma-components/lib/components/icon'
import MdPhone from 'react-ionicons/lib/MdCall'

import ProfilePic from './ProfilePic'
import UserAttributeCard from '../Cards/UserAttributeCard'
import { ReactComponent as Shield } from '../../assets/Copper_3.svg'

import './profile.scss'

export default class ReUserProfile extends Component {
  render() {
    return (
      <div className="user-profile">
        <ProfilePic />
        <h1 className="user-profile-name">Bastilla Shan</h1>
        <Level breakpoint="mobile" className="profile-stats">
          <Level.Item>
            <div className="profile-stat">
              <span className="stat">8</span>
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
              <span className="stat">25</span>
              <span className="stat-text">Shares</span>
            </div>
          </Level.Item>
        </Level>
        <UserAttributeCard
          header="Phone"
          attrs={[
            {
              id: 1,
              icon: <MdPhone color="#1BBC9B" fontSize="2.5rem" />,
              name: 'Mobile',
              value: '(223) 262-0950',
              verified: true
            },
            {
              id: 2,
              icon: <MdPhone color="#1BBC9B" fontSize="2.5rem" />,
              name: 'Work',
              value: '(987) 234-4564',
              verified: false
            }
          ]}
        />
      </div>
    )
  }
}
