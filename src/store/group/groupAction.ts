import { RespliceState } from '../store'
import {
  GroupState,
  Group,
  GroupMember,
  GroupAttribute,
  GroupShare,
  GroupActions,
  FETCH_GROUPS
} from './types'

import { ThunkAction } from 'redux-thunk'
import api from '../../api'

import { toDictionary } from '../../helpers'

type GroupThunk = ThunkAction<Promise<void>, RespliceState, null, GroupActions>

export const fetchGroups = (): GroupThunk => async (dispatch) => {
  dispatch({ type: FETCH_GROUPS, loading: true })
  try {
    const response = await api.get('/groups')
    const groups: Group[] = response.data
    const groupRecords: Dictionary<Group> = toDictionary('uuid', groups)
    dispatch({
      type: FETCH_GROUPS,
      payload: groupRecords
    })
  } catch (err) {
    dispatch({ type: FETCH_GROUPS, error: err })
  }
}
