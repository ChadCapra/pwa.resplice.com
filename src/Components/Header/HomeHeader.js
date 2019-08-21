import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import FlexBox from '../Layout/FlexBox'
import MdCamera from 'react-ionicons/lib/MdCamera'
import MdClose from 'react-ionicons/lib/MdClose'
import MdSearch from 'react-ionicons/lib/MdSearch'
import ReAvatarThumbnail from '../Profile/Avatar/ReAvatarThumbnail'
import SearchTags from '../Util/SearchTags'
import ReInput from '../Form/ReInput'

import styles from './Header.module.scss'

import {
  updateQuery,
  clearQuery,
  updateSearchTags,
  clearSearchTags
} from '../../state/actions'

const HomeHeader = ({
  user: { uuid, avatar, tags },
  search,
  updateQuery,
  clearQuery,
  updateSearchTags,
  clearSearchTags
}) => {
  const [toUser, setToUser] = useState(false)
  const [searching, setSearching] = useState(false)

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

  if (toUser) return <Redirect push to="/user" />
  return (
    <FlexBox
      justify="between"
      style={{ padding: '16px', position: 'relative' }}
    >
      <FlexBox justify="center" align="center">
        {searching ? (
          <MdSearch fontSize="3em" color="#1BBC9B" />
        ) : (
          <MdCamera fontSize="3em" color="#1BBC9B" />
        )}
      </FlexBox>

      <FlexBox style={{ width: '70%' }} justify="center" align="center">
        <ReInput
          input={{ value: search.query }}
          type="text"
          label="Who are you looking for?"
          meta={{}}
          onChange={e => updateQuery(e.target.value)}
          onFocus={() => setSearching(true)}
          style={{ margin: 0 }}
        />
      </FlexBox>

      <FlexBox justify="center" align="center">
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
      </FlexBox>

      {searching && (
        <div className={styles.SearchTagOverlay}>
          <SearchTags
            style={{ marginBottom: '3px' }}
            tags={Object.values(tags)}
            selectedTags={search.tags}
            onClick={toggleTag}
          />
        </div>
      )}
    </FlexBox>
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
)(HomeHeader)
