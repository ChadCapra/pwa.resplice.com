import React from 'react'
import { connect } from 'react-redux'
import { RespliceState, Group } from '../../store/store'
import styled from 'styled-components'

import EntityList from '../shared/entity/EntityList'
import GroupSummary from './GroupSummary'

const ListContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 1em;
  box-sizing: border-box;
`

type Props = {
  groups: Dictionary<Group> | null
}

const GroupList = ({ groups }: Props) => {
  return groups ? (
    <ListContainer>
      <EntityList list={Object.values(groups)} ListItem={GroupSummary} />
    </ListContainer>
  ) : null
}

const mapStateToProps = (state: RespliceState) => {
  return {
    groups: state.groupState.groups
  }
}

export default connect(mapStateToProps)(GroupList)
