import React from 'react'
import { connect } from 'react-redux'
import { enableQrShare, disableQrShare } from '../../state/actions'

import CardList from './CardList'
import FlexBox from '../Layout/FlexBox'

const ReShareAttributes = ({ collections, enableQrShare, disableQrShare }) => {
  const toggleShare = (on, uuid) => {
    if (on) enableQrShare(uuid)
    else disableQrShare(uuid)
  }

  return (
    <FlexBox direction="column" align="center" style={{ padding: '1.5em 0' }}>
      <CardList
        list={Object.entries(collections)}
        toggleKey="qr_sharable"
        toggleAttribute={toggleShare}
      />
    </FlexBox>
  )
}

const mapStateToProps = state => {
  return {
    collections: state.userState.collections
  }
}

export default connect(
  mapStateToProps,
  { enableQrShare, disableQrShare }
)(ReShareAttributes)
