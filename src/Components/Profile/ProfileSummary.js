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
    is_moderator,
    member_count,
    selected
  },
  groupName,
  pad,
  rightChild,
  hideInfo,
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

  const renderSummaryRight = () => {
    if (hideInfo) return null
    if (pending_expiration) {
      return (
        <span>
          Expires in{' '}
          {getTimeRemaining(new Date(), new Date(pending_expiration))}
        </span>
      )
    } else if (is_moderator) {
      return <MdRibbon fontSize="2em" color="#1bbc9b" />
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
          selected={selected}
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
      {rightChild ? (
        <FlexBox
          className={styles.SummaryRight}
          justify="center"
          align="center"
        >
          {React.cloneElement(rightChild, { uuid, name })}
        </FlexBox>
      ) : (
        <FlexBox
          className={styles.SummaryRight}
          justify="center"
          align="center"
          onClick={() => onClick(uuid)}
        >
          {renderSummaryRight()}
        </FlexBox>
      )}
    </FlexBox>
  )
}

export default ProfileSummary
