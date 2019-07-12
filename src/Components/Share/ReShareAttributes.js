import React from 'react'
import { connect } from 'react-redux'
import { enableQrShare, disableQrShare } from '../../state/actions'

import CardList from '../Card/CardList'
import ShareCard from '../Card/ShareCard'

const ReShareAttributes = ({ collections, enableQrShare, disableQrShare }) => {
  const toggleShare = (on, uuid) => {
    if (on) enableQrShare(uuid)
    else disableQrShare(uuid)
  }

  return (
    <div className="share-attributes">
      <div className="share-attributes-body">
        <CardList
          list={Object.entries(collections)}
          Card={ShareCard}
          toggleKey="qr_sharable"
          toggleAttribute={toggleShare}
        />
      </div>
    </div>
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
