import React from 'react'

import FlexBox from '../Layout/FlexBox'
import ReAvatarThumbnail from './Avatar/ReAvatarThumbnail'
import MdRibbon from 'react-ionicons/lib/MdRibbon'

import cx from 'classnames'
import styles from './Profile.module.scss'

import { combineTags, getTimeRemaining } from '../../helpers'

const ProfileSummary = ({
  profile: { uuid, name, avatar, tags, pending_expiration, admin, selected },
  groupName,
  pad
}) => {
  const summaryStyle = cx(styles.ProfileSummary, {
    [styles.Pending]: pending_expiration,
    [styles.Pad]: pad
  })

  const infoText = (() => {
    if (pending_expiration) {
      return 'Pending'
    } else if (groupName) {
      return groupName
    } else if (tags) {
      return combineTags(tags)
    }
  })()

  return (
    <FlexBox className={summaryStyle} justify="between" align="center">
      <FlexBox className={styles.Summary} justify="start" align="center">
        <ReAvatarThumbnail uuid={uuid} avatar={avatar} selected={selected} />
        <FlexBox className={styles.Text} direction="column" justify="center">
          <span>{name}</span>
          {infoText && <span>{infoText}</span>}
        </FlexBox>
      </FlexBox>
      <FlexBox className={styles.SummaryRight} justify="end" align="center">
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
