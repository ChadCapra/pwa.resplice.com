import React, { useState } from 'react'
import { connect } from 'react-redux'

import ReInput from '../Form/ReInput'
import ReInputPhone from '../Form/ReInputPhone'
import ReShareDropdown from '../Share/ReShareDropdown'
import MdMail from 'react-ionicons/lib/MdMail'
import MdCall from 'react-ionicons/lib/MdCall'
import ReAvatarThumbnail from '../Profile/Avatar/ReAvatarThumbnail'
import ReButton from '../Button/ReButton'

import { inviteMembers } from '../../state/actions'

const QUERY_TYPES = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
  CONTACT: 'CONTACT',
  NONE: ''
}

const ReGroupInvite = ({ inviteMembers, loading }) => {
  const [query, setQuery] = useState('')
  const [queryType, setQueryType] = useState(QUERY_TYPES.NONE)
  const [shareList, setShareList] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleItemClick = () => {
    setShowDropdown(false)
    setShareList(...shareList.push({ type: queryType, value: query }))
    setQuery('')
    setQueryType(QUERY_TYPES.NONE)
  }

  const handleContactClick = contact => {
    setShowDropdown(false)
    setShareList(
      ...shareList.push({
        type: QUERY_TYPES.CONTACT,
        value: contact.uuid,
        contact
      })
    )
    setQuery('')
    setQueryType(QUERY_TYPES.NONE)
  }

  const removeShareItem = idx => {
    setShareList(...shareList.splice(idx, 1))
  }

  const handleInputChange = value => {
    const numsOnly = /^[+0-9()-\s]+$/
    // eslint-disable-next-line
    const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (email.test(value)) {
      setQueryType(QUERY_TYPES.EMAIL)
    } else if (numsOnly.test(value) && value.length > 2) {
      if (queryType !== QUERY_TYPES.PHONE && value[0] !== '+') {
        value = '1' + value
      }
      setQueryType(QUERY_TYPES.PHONE)
    } else {
      setQueryType(QUERY_TYPES.NONE)
    }

    setQuery(value)
  }

  const renderIcon = item => {
    if (item.type === QUERY_TYPES.EMAIL) {
      return <MdMail fontSize="2em" color="white" />
    } else if (item.type === QUERY_TYPES.PHONE) {
      return <MdCall fontSize="2em" color="white" />
    } else {
      return (
        <ReAvatarThumbnail
          avatar={item.contact.avatar}
          uuid={item.contact.uuid}
        />
      )
    }
  }

  const handleInvite = () => {
    const list = shareList.map(item => {
      return {
        type: item.type.toLowerCase(),
        value: item.value
      }
    })
    inviteMembers(list)
  }

  return (
    <div className="share-list">
      <h1 className="invite-header">Group Name</h1>

      <div className="share-list-input-container">
        {queryType === QUERY_TYPES.PHONE ? (
          <ReInputPhone
            label="Phone"
            meta={{
              pristine: true,
              touched: false,
              error: '',
              warning: ''
            }}
            onChange={value => {
              handleInputChange(value)
            }}
            input={{ value: this.state.query }}
            inputExtraProps={{ autoFocus: true }}
          />
        ) : (
          <ReInput
            type="text"
            label="Email or Phone"
            meta={{
              pristine: true,
              touched: false,
              error: '',
              warning: ''
            }}
            onChange={e => this.handleInputChange(e.target.value)}
            input={{ value: this.state.query }}
            autoFocus
          />
        )}
      </div>

      <div className="share-list-footer">
        <ReButton
          type="primary"
          disabled={shareList.length <= 0}
          loading={loading}
          onClick={() => handleInvite(shareList)}
        >
          Invite
        </ReButton>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.shareState.loading
  }
}

export default connect(
  mapStateToProps,
  { inviteMembers }
)(ReGroupInvite)
