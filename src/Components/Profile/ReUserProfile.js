import React, { Component } from 'react'
import { connect } from 'react-redux'

import Level from 'react-bulma-components/lib/components/level'
import Icon from 'react-bulma-components/lib/components/icon'
import MdAddCircle from 'react-ionicons/lib/MdAddCircle'

import ProfilePic from './ProfilePic'
import UserAttributeCard from '../Cards/UserAttributeCard'
import ReModal from '../Modals/ReModal'
import CreateAttribute from '../Modals/CreateAttribute'
import { ReactComponent as Shield } from '../../assets/Copper_3.svg'

import './profile.scss'

class ReUserProfile extends Component {
  state = {
    showCreateModal: false
  }

  openCreateModal = () => this.setState({ showCreateModal: true })
  closeCreateModal = () => this.setState({ showCreateModal: false })

  renderAttributeCards = () => {
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
        <div className="profile-add">
          <MdAddCircle
            color="#1BBC9B"
            fontSize="4rem"
            onClick={this.openCreateModal}
          />
        </div>
        <ReModal
          show={this.state.showCreateModal}
          close={this.closeCreateModal}
          modal={{ closeOnBlur: true }}
        >
          <CreateAttribute />
        </ReModal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    collections: state.attributes.collections
  }
}

export default connect(mapStateToProps)(ReUserProfile)
