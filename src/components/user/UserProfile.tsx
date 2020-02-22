import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { RespliceState, IUserProfile } from '../../store/store'

import Flex from '../shared/layout/Flex'
import Avatar from '../shared/avatar/Avatar'
import UserRanks from './UserRanks'
import UserCollections from './UserCollections'

const UserProfileContainer = styled.div`
  width: 100%;
  max-width: var(--mobile-max-px);
  overflow: auto;
  padding: 1.5em;
`

const UserName = styled.h1`
  font-size: 2em;
  text-align: center;
  margin: 0.5em 0;
`
const Stat = styled.h1`
  font-size: 2em;
  text-align: center;
  color: var(--brand-primary);
  margin-bottom: 0.25em;
`
const StatTitle = styled.h3`
  font-size: 1.5em;
  text-align: center;
  color: var(--text-light);
`

type Props = {
  profile: IUserProfile | null
  contactCount: number | null
}

const UserProfile = ({ profile, contactCount }: Props) => {
  if (!profile) return <p>Error fetching profile</p>
  return (
    <Flex justify="center" fill>
      <UserProfileContainer>
        <Avatar
          uuid={profile.uuid}
          avatar={profile.avatar}
          onAvatarEdit={() => {}}
        />
        <UserName>{profile.name}</UserName>

        <Flex justify="between" align="center" style={{ marginBottom: '1em' }}>
          <Flex direction="column" justify="center" grow>
            <Stat>{contactCount}</Stat>
            <StatTitle>Contacts</StatTitle>
          </Flex>
          <Flex justify="center" grow>
            <UserRanks />
          </Flex>
          <Flex direction="column" justify="center" grow>
            <Stat>{profile.share_count}</Stat>
            <StatTitle>Shares</StatTitle>
          </Flex>
        </Flex>

        <UserCollections />
      </UserProfileContainer>
    </Flex>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    profile: state.userState.profile,
    contactCount:
      state.contactState.contacts &&
      Object.keys(state.contactState.contacts).length
  }
}

export default connect(mapStateToProps)(UserProfile)
