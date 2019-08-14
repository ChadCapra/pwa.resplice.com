import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Columns from 'react-bulma-components/lib/components/columns'
import MdCamera from 'react-ionicons/lib/MdCamera'
import MdClose from 'react-ionicons/lib/MdClose'
import MdSearch from 'react-ionicons/lib/MdSearch'
import SwipeNav from './SwipeNav'
import ReAvatarThumbnail from '../Profile/Avatar/ReAvatarThumbnail'
import ReInput from '../Form/ReInput'

import {
  updateQuery,
  clearQuery,
  updateSearchTags,
  clearSearchTags
} from '../../state/actions'

import './header.scss'
import ReSearchTags from '../Util/ReSearchTags'

const ReHeader = ({
  user: { uuid, avatar, tags },
  search,
  updateQuery,
  clearQuery,
  updateSearchTags,
  clearSearchTags,
  handleNavClick
}) => {
  const [toUser, setToUser] = useState(false)
  const [searching, setSearching] = useState(false)

  if (toUser) return <Redirect push to="/user" />

  const toggleTag = tag => {
    const newTags = [...search.tags]
    const idx = newTags.findIndex(t => t === tag)
    if (idx < 0) {
      newTags.push(tag)
    } else {
      newTags.splice(idx, 1)
    }
    updateSearchTags(newTags)
  }

  return (
    <div className="home-header">
      <Columns
        breakpoint="mobile"
        gapless
        style={{ padding: '16px', margin: 0 }}
      >
        <Columns.Column size={2} style={{ height: '50px' }}>
          {searching ? (
            <MdSearch fontSize="3em" color="#1BBC9B" />
          ) : (
            <MdCamera fontSize="3em" color="#1BBC9B" />
          )}
        </Columns.Column>

        <Columns.Column>
          {searching ? (
            <ReInput
              input={{ value: search.query }}
              type="text"
              label="Who are you looking for?"
              meta={{}}
              onChange={e => updateQuery(e.target.value)}
              style={{ width: 'auto', margin: 0 }}
              autoFocus
            />
          ) : (
            <div
              className="flex--center re-input"
              style={{ width: 'auto', margin: 0 }}
              onClick={() => setSearching(true)}
            >
              Search
            </div>
          )}
        </Columns.Column>
        <Columns.Column
          size={2}
          className="icon-right"
          style={{ height: '50px' }}
        >
          {searching ? (
            <MdClose
              fontSize="3em"
              color="#1BBC9B"
              onClick={() => {
                clearQuery()
                clearSearchTags()
                setSearching(false)
              }}
            />
          ) : (
            <div onClick={() => setToUser(true)}>
              <ReAvatarThumbnail
                avatar={avatar}
                uuid={uuid}
                style={{ margin: 0 }}
              />
            </div>
          )}
        </Columns.Column>
      </Columns>
      {searching ? (
        <ReSearchTags
          style={{ marginBottom: '3px' }}
          tags={Object.values(tags)}
          selectedTags={search.tags}
          onClick={toggleTag}
        />
      ) : (
        <SwipeNav
          menus={['Groups', 'Individuals']}
          handleNavClick={handleNavClick}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userState.profile,
    search: state.utilState.search
  }
}

export default connect(
  mapStateToProps,
  { updateQuery, clearQuery, updateSearchTags, clearSearchTags }
)(ReHeader)
