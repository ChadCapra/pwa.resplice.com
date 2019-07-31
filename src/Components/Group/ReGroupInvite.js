import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import ReInput from '../Form/ReInput'
import ReInputPhone from '../Form/ReInputPhone'
import ReShareDropdown from '../Share/ReShareDropdown'
import MdMail from 'react-ionicons/lib/MdMail'
import MdCall from 'react-ionicons/lib/MdCall'
import MdClose from 'react-ionicons/lib/MdClose'
import ReAvatarThumbnail from '../Profile/Avatar/ReAvatarThumbnail'
import ReButton from '../Button/ReButton'
import ReProfileHeaderSummary from '../Profile/ReProfileHeaderSummary'
import ReDropdown from '../Form/ReDropdown'
import ReExit from '../Util/ReExit'
import ImportContact from '../Util/ImportContact'

import { inviteMembers } from '../../state/actions'

const QUERY_TYPES = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
  CONTACT: 'CONTACT',
  NONE: ''
}

const ReGroupInvite = ({ group, inviteMembers, loading, match }) => {
  const [query, setQuery] = useState('')
  const [queryType, setQueryType] = useState(QUERY_TYPES.NONE)
  const [shareList, setShareList] = useState([])

  const handleItemClick = () => {
    if (queryType === QUERY_TYPES.NONE) return
    const newShareList = [...shareList]
    newShareList.push({ type: queryType, value: query })
    setShareList(newShareList)
    setQuery('')
    setQueryType(QUERY_TYPES.NONE)
  }

  const handleContactClick = contact => {
    const newShareList = [...shareList]
    newShareList.push({
      type: QUERY_TYPES.CONTACT,
      value: contact.uuid,
      contact
    })
    setShareList(newShareList)
    setQuery('')
    setQueryType(QUERY_TYPES.NONE)
  }

  const removeShareItem = idx => {
    const newShareList = [...shareList]
    newShareList.splice(idx, 1)
    setShareList(newShareList)
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
    const members = shareList.map(item => {
      return {
        type: item.type.toLowerCase(),
        value: item.value
      }
    })
    inviteMembers(match.params.uuid, members)
  }

  if (!group) return <Redirect to="/" />

  return (
    <div className="group-invite">
      <div className="group-invite-top">
        <div className="share-list-header">
          <ReProfileHeaderSummary profile={group} />
          <ReExit exitRoute={`/group/${match.params.uuid}`} />
        </div>

        <div style={{ width: '90%', maxWidth: '575px' }}>
          <ReDropdown
            type="primary"
            title="Import Contact Information"
            list={[
              <ImportContact>
                <ImportContact.Google />
              </ImportContact>,
              <ImportContact>
                <ImportContact.Apple />
              </ImportContact>,
              <ImportContact>
                <ImportContact.Microsoft />
              </ImportContact>
            ]}
            onSelect={id => console.log(id)}
          />
        </div>

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
              input={{ value: query }}
              inputExtraProps={{ autoFocus: true }}
            />
          ) : (
            <ReInput
              type="text"
              label="Email, Phone, or Name"
              meta={{
                pristine: true,
                touched: false,
                error: '',
                warning: ''
              }}
              onChange={e => handleInputChange(e.target.value)}
              input={{ value: query }}
              autoFocus
            />
          )}
          {query.length > 0 && (
            <ReShareDropdown
              query={query}
              queryType={queryType}
              handleAttrClick={handleItemClick}
              handleContactClick={handleContactClick}
            />
          )}
        </div>
      </div>

      <div className="invite-attribute-container">
        {shareList.map((item, idx) => (
          <div key={idx} className="share-list-item">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="share-list-icon">{renderIcon(item)}</div>
              <div>{item.value}</div>
            </div>
            <MdClose
              fontSize="2em"
              color="#1BBC9B"
              onClick={() => removeShareItem(idx)}
            />
          </div>
        ))}
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

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.shareState.loading,
    group: state.groupState.groups[ownProps.match.params.uuid]
  }
}

export default connect(
  mapStateToProps,
  { inviteMembers }
)(ReGroupInvite)
