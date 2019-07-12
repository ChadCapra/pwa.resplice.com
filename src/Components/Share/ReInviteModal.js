import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { inviteContact } from '../../state/actions'

import MdMail from 'react-ionicons/lib/MdMail'
import MdCall from 'react-ionicons/lib/MdCall'
import ReInput from '../Form/ReInput'
import ReInputPhone from '../Form/ReInputPhone'
import ReShareDropdown from './ReShareDropdown'
import MdClose from 'react-ionicons/lib/MdClose'
import ReButton from '../Button/ReButton'

const QUERY_TYPES = {
  EMAIL: 'Email',
  PHONE: 'Phone',
  NONE: ''
}

const ReInviteModal = ({ loading, inviteContact }) => {
  const [queryType, setQueryType] = useState(QUERY_TYPES.NONE)
  const [query, setQuery] = useState('')
  const [attribute, setAttribute] = useState(null)

  const handleAttrClick = () => {
    setAttribute({ type: queryType, value: query })
    setQuery('')
    setQueryType(QUERY_TYPES.NONE)
  }

  const clearAttribute = () => {
    setAttribute(null)
  }

  const handleInputChange = value => {
    let numsOnly = /^[+0-9()-\s]+$/
    // eslint-disable-next-line
    let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
    }
  }

  return (
    <div className="re-invite-modal flex-col--center">
      <div className="invite-label">Invite via phone or email</div>
      {!attribute && (
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
              label="Email or Phone"
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
              handleAttrClick={handleAttrClick}
            />
          )}
        </div>
      )}

      <div className="invite-attribute-container flex-col--center">
        {attribute && (
          <div className="share-list-item" style={{ marginBottom: '25px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="share-list-icon">{renderIcon(attribute)}</div>
              <div>{attribute.value}</div>
            </div>
            <MdClose
              fontSize="2em"
              color="#1BBC9B"
              onClick={() => clearAttribute()}
            />
          </div>
        )}
        <ReButton
          type="primary"
          disabled={!attribute}
          loading={loading}
          onClick={() => inviteContact({ phone_or_email: attribute.value })}
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

ReInviteModal.propTypes = {
  loading: PropTypes.bool.isRequired,
  inviteContact: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { inviteContact }
)(ReInviteModal)
