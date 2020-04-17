import React from 'react'
import { connect } from 'react-redux'
import { RespliceState, Group } from '../../store/store'

import EntityList from '../shared/entity/EntityList'

type Props = {
  groups: Dictionary<Group> | null
}

const GroupList = ({ groups }: Props) => {
  // return groups ? (
  //   <>
  //     <EntityList list={groups} />
  //   </>
  // ) : null
  return null
}

const mapStateToProps = (state: RespliceState) => {
  return {
    groups: state.groupState.groups
  }
}

export default connect(mapStateToProps)(GroupList)
