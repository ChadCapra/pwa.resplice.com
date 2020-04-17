import React from 'react'
import { Group } from '../../store/store'

import EntitySummary from '../shared/entity/EntitySummary'
import AvatarThumbnail from '../shared/avatar/AvatarThumbnail'

type Props = {
  entity: Group
  style?: React.CSSProperties
}

const formatMemberCount = (count: number): string => {
  return `${count} ${count === 1 ? 'person' : 'people'}`
}

const GroupSummary = ({ entity: group, style }: Props) => {
  return (
    <EntitySummary
      title={group.name}
      subtitle={formatMemberCount(group.member_count)}
      thumbnail={
        <AvatarThumbnail
          avatar={group.avatar}
          uuid={group.uuid}
          onClick={() => {}}
        />
      }
      style={style}
    />
  )
}

export default GroupSummary
