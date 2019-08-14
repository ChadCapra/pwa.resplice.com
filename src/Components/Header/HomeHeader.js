import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import FlexBox from '../Layout/FlexBox'
import MdCamera from 'react-ionicons/lib/MdCamera'
import MdClose from 'react-ionicons/lib/MdClose'
import MdSearch from 'react-ionicons/lib/MdSearch'
import ReAvatarThumbnail from '../Profile/Avatar/ReAvatarThumbnail'
import ReSearchTags from '../Util/ReSearchTags'
import ReInput from '../Form/ReInput'

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
  clearSearchTags,
  handleNavClick
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
    <FlexBox>
      <FlexBox />
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
