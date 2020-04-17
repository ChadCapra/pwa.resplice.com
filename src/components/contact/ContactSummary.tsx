import React from 'react'
import { Contact } from '../../store/store'

import EntitySummary from '../shared/entity/EntitySummary'
import AvatarThumbnail from '../shared/avatar/AvatarThumbnail'

type Props = {
  entity: Contact
  style?: React.CSSProperties
}

const formatTags = (tags: string[]): string => {
  return tags ? tags.join(' ') : ''
}

const ContactSummary = ({ entity: contact, style }: Props) => {
  return (
    <EntitySummary
      title={contact.name}
      subtitle={formatTags(contact.tags)}
      thumbnail={
        <AvatarThumbnail
          avatar={contact.avatar}
          uuid={contact.uuid}
          onClick={() => {}}
        />
      }
      style={style}
    />
  )
}

export default ContactSummary
