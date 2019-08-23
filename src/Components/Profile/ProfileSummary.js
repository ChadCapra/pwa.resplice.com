import React from 'react'

import FlexBox from '../Layout/FlexBox'
import ReAvatarThumbnail from './Avatar/ReAvatarThumbnail'
import MdRibbon from 'react-ionicons/lib/MdRibbon'

import cx from 'classnames'
import styles from './Profile.module.scss'

import { combineTags, getTimeRemaining } from '../../helpers'

const ProfileSummary = ({
  profile: {
    uuid,
    name,
    avatar,
    tags,
    pending_expiration,
    admin,
    member_count,
    selected
  },
  groupName,
  pad,
  handleSelect,
  handleDeselect,
  onClick,
  ...props
}) => {
  const summaryStyle = cx(styles.ProfileSummary, {
    [styles.Pending]: pending_expiration
  })

  const infoText = (() => {
    if (pending_expiration) {
      return 'Pending'
    } else if (groupName) {
      return groupName
    } else if (tags) {
      return combineTags(tags)
    } else if (member_count) {
      return member_count === 1
        ? `${member_count} person`
        : `${member_count} people`
    }
  })()

  const determineAvatarIcon = () => {
    if (selected) {
      return 'check'
    }
  }

  return (
    <FlexBox
      className={summaryStyle}
      justify="between"
      align="center"
      {...props}
    >
      <FlexBox className={styles.Summary} justify="start" align="center">
        <ReAvatarThumbnail
          uuid={uuid || name}
          avatar={avatar}
          icon={determineAvatarIcon()}
          onSelect={handleSelect}
          onDeselect={handleDeselect}
          pad={pad}
        />
        <FlexBox
          className={styles.SummaryText}
          direction="column"
          justify="center"
          onClick={() => onClick(uuid)}
        >
          <span>{name}</span>
          {infoText && <span>{infoText}</span>}
        </FlexBox>
      </FlexBox>
      <FlexBox
        className={styles.SummaryRight}
        justify="end"
        align="center"
        onClick={() => onClick(uuid)}
      >
        {(pending_expiration && (
          <span>
            Expires in{' '}
            {getTimeRemaining(new Date(), new Date(pending_expiration))}
          </span>
        )) ||
          (groupName && admin && <MdRibbon fontSize="2em" color="#1bbc9b" />)}
      </FlexBox>
    </FlexBox>
  )
}

export default ProfileSummary
