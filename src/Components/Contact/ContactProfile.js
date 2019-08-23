import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import FlexBox from '../Layout/FlexBox'
import Notification from '../Util/ReNotification'
import ProfileLoading from '../Loading/ReProfileLoading'
import Avatar from '../Profile/Avatar/ReAvatar'
import ReModal from '../Modal/ReModal'
import Tags from '../Util/ReTags'
import CardList from './CardList'
import ReButton from '../Button/ReButton'

import { getTimeRemaining, getPendingValues } from '../../helpers'
import { fetchContact, declinePending } from '../../state/actions'

import styles from './Contact.module.scss'

const ProfileTags = ({ tags }) => {
  return (
    <div className={styles.Tags}>
      {tags.map((tag, idx) => (
        <span key={tag}>
          {tag} {idx !== tags.length - 1 ? '|' : null}{' '}
        </span>
      ))}
    </div>
  )
}

const ContactProfile = ({ uuid, profile, fetchContact, declinePending }) => {
  const [showTagModal, setShowTagModal] = useState(false)

  useEffect(() => {
    fetchContact(uuid)
  }, [fetchContact, uuid])

  if (!profile.collections) return <ProfileLoading />

  const handleTagChange = value => {
    console.log(value)
  }

  const handleAction = action => {
    console.log(action)
  }

  const collections = Object.entries(profile.collections)
  const pendingValues = getPendingValues(profile.attributes)

  return (
    <>
      <FlexBox direction="column" align="center" style={{ padding: '16px 0' }}>
        {profile.pending_expiration && (
          <Notification type="info" style={{ marginBottom: '25px' }}>
            <Notification.Header>Pending Shares</Notification.Header>
            <Notification.Body>
              Share {pendingValues.join(' or ')} to unlock <br />
              Expires in{' '}
              {getTimeRemaining(
                new Date(profile.pending_expiration),
                new Date()
              )}
            </Notification.Body>
          </Notification>
        )}

        <Avatar uuid={profile.uuid} avatar={profile.avatar} viewOnly />

        <FlexBox
          direction="column"
          align="center"
          onClick={() => setShowTagModal(true)}
        >
          <h1>{profile.name}</h1>
          <ProfileTags tags={profile.tags} />
        </FlexBox>

        {collections.length ? (
          <CardList list={collections} handleAction={handleAction} />
        ) : (
          'No Attributes Shared'
        )}

        {profile.pending_expiration && (
          <ReButton
            type="secondary"
            style={{ border: '1px solid #6C7DD5', color: '#6C7DD5' }}
            onClick={() => declinePending(profile.uuid)}
          >
            Decline Share
          </ReButton>
        )}
      </FlexBox>

      <ReModal
        show={showTagModal}
        onClose={() => setShowTagModal(false)}
        headerText="Tags"
      >
        <Tags
          selectedTags={profile.tags}
          tags={['Father', 'Dark Side', 'Friends']}
          onTagChange={handleTagChange}
        />
      </ReModal>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.contactState.contacts[ownProps.uuid]
  }
}

export default connect(
  mapStateToProps,
  { fetchContact, declinePending }
)(ContactProfile)
