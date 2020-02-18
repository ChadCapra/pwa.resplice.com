import React from 'react'
import { connect } from 'react-redux'
import { RespliceState, GroupRecord } from '../../store/store'

import EntityList from '../shared/entity/EntityList'

type Props = {
  groups: Dictionary<GroupRecord> | null
}

const GroupList = ({ groups }: Props) => {
  return groups ? (
    <>
      <EntityList list={groups} />
    </>
  ) : null
}

const mapStateToProps = (state: RespliceState) => {
  return {
    groups: state.groupState.groups
  }
}

export default connect(mapStateToProps)(GroupList)
