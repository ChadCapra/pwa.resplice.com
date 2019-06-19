import React from 'react'

import ContactProfilePic from './ContactProfilePic'
import CardList from '../Cards/CardList'
import ViewCard from '../Cards/ViewCard'

import { handleAttributeAction } from '../../helpers'

import './contact.scss'

const ReContactProfile = ({ profile: { uuid, name, tags } }) => {
  const handleAction = (actionType, { value }) => {
    handleAttributeAction(actionType, value)
  }

  return (
    <div className="profile">
      <ContactProfilePic uuid={uuid} />
      <h1 className="profile-name">{name}</h1>
      <div className="profile-tags">{tags}</div>

      <CardList
        type="contact"
        Card={ViewCard}
        contactUuid={uuid}
        handleAction={handleAction}
      />
    </div>
  )
}

export default ReContactProfile
