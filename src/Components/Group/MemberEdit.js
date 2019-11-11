import React, { useState, useRef } from 'react'

import MdCreate from 'react-ionicons/lib/MdCreate'
import MdPersonAdd from 'react-ionicons/lib/MdPersonAdd'
import MdRemoveCircle from 'react-ionicons/lib/MdRemoveCircle'
import Dropdown from '../Form/Dropdown'
import FlexBox from '../Layout/FlexBox'
import ReButton from '../Button/ReButton'

const MemberEdit = ({
  uuid,
  name,
  isModerator,
  addModerator,
  removeModerator,
  removeMember
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [action, setAction] = useState(null)
  const editNode = useRef()

  const handleAction = () => {
    switch (action.action) {
      case 'addModerator':
        addModerator(uuid)
        setAction(null)
        setShowDropdown(false)
        break
      case 'removeModerator':
        removeModerator(uuid)
        setAction(null)
        setShowDropdown(false)
        break
      case 'removeMember':
        removeMember(uuid)
        setAction(null)
        setShowDropdown(false)
        break
      default:
        throw new Error('Index is out of range')
    }
  }

  const renderItems = () => {
    if (action) {
      return [
        <FlexBox direction="column" justify="center" align="center">
          <span style={{ textAlign: 'center' }}>{action.text}</span>
          <ReButton
            type="primary"
            style={{ height: '38px', width: '100px', marginTop: '8px' }}
            onClick={handleAction}
          >
            Yes
          </ReButton>
        </FlexBox>
      ]
    }

    const moderatorAction = isModerator ? (
      <FlexBox
        justify="start"
        align="center"
        onClick={() =>
          setAction({
            action: 'removeModerator',
            text: `Remove ${name} from moderators?`
          })
        }
      >
        <MdPersonAdd fontSize="2.5em" color="#1bbc9b" />
        <span style={{ marginLeft: '8px' }}>Add Moderator</span>
      </FlexBox>
    ) : (
      <FlexBox
        justify="start"
        align="center"
        onClick={() =>
          setAction({
            action: 'addModerator',
            text: `Add ${name} as a moderator?`
          })
        }
      >
        <MdPersonAdd fontSize="2.5em" color="#1bbc9b" />
        <span style={{ marginLeft: '8px' }}>Add Moderator</span>
      </FlexBox>
    )

    const removeMemberAction = (
      <FlexBox
        justify="start"
        align="center"
        onClick={() =>
          setAction({
            action: 'removeMember',
            text: `Remove ${name} from this group?`
          })
        }
      >
        <MdRemoveCircle fontSize="2.5em" color="#1bbc9b" />
        <span style={{ marginLeft: '8px' }}>Remove Member</span>
      </FlexBox>
    )

    return [moderatorAction, removeMemberAction]
  }

  return (
    <div ref={editNode}>
      <MdCreate
        fontSize="2em"
        color="#1bbc9b"
        onClick={() => setShowDropdown(true)}
      />
      {showDropdown && (
        <Dropdown
          parent={editNode.current}
          items={renderItems()}
          onSelect={() => {}}
          close={() => setShowDropdown(false)}
          xOffset={-200}
        />
      )}
    </div>
  )
}

export default MemberEdit
