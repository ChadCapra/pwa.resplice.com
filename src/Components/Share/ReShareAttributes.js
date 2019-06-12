import React from 'react'
// import { connect } from 'react-redux'

import AttributeCardList from '../Cards/AttributeCardList'
import AttributeSelectCard from '../Cards/AttributeSelectCard'

const ReShareAttributes = () => {
  return (
    <div className="share-attributes">
      <div className="share-attributes-body">
        <AttributeCardList
          ListComponent={AttributeSelectCard}
          type="user"
          attributeList={[]}
          toggleAttribute={() => {}}
        />
      </div>
    </div>
  )
}

export default ReShareAttributes
// export default connect(
//   null,
//   { setShareAttributes }
// )(ReShareAttributes)
