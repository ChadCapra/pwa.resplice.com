import { RespliceState } from '../store'
import {
  GroupState,
  Group,
  GroupRecord,
  GroupMember,
  GroupAttribute,
  GroupShare,
  GroupActions,
  FETCH_GROUPS
} from './types'

import { ThunkAction } from 'redux-thunk'
import api from '../../api'

import { toDictionary } from '../../helpers'

export const fetchGroups = (): ThunkAction<
  void,
  RespliceState,
  null,
  GroupActions
> => async dispatch => {
  dispatch({ type: FETCH_GROUPS, loading: true })
  try {
    const response = await api.get('/groups/get')
    const groups: Group[] = response.data
    const groupRecords: Dictionary<GroupRecord> = toDictionary('uuid', groups)
    dispatch({
      type: FETCH_GROUPS,
      payload: groupRecords
    })
  } catch (err) {
    dispatch({ type: FETCH_GROUPS, error: err })
  }
}
