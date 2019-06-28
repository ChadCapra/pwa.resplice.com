import React from 'react'
import { connect } from 'react-redux'
import { enableQrShare, disableQrShare } from '../../state/actions'

import CardList from '../Card/CardList'
import ShareCard from '../Card/ShareCard'

const ReShareAttributes = ({ enableQrShare, disableQrShare }) => {
  return (
    <div className="share-attributes">
      <div className="share-attributes-body">
        <CardList
          Card={ShareCard}
          type="user"
          toggleKey="qr_sharable"
          toggleAttribute={(on, uuid) => {
            if (on) enableQrShare(uuid)
            else disableQrShare(uuid)
          }}
        />
      </div>
    </div>
  )
}

export default connect(
  null,
  { enableQrShare, disableQrShare }
)(ReShareAttributes)
