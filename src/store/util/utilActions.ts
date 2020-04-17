import { RespliceState } from '../store'
import {
  AttributeType,
  UtilActions,
  FETCH_ATTRIBUTE_TYPES,
  SET_OFFLINE
} from './types'
import { ThunkAction } from 'redux-thunk'
import api from '../../api'

export const fetchAttributeTypes = (): ThunkAction<
  Promise<void>,
  RespliceState,
  null,
  UtilActions
> => async (dispatch) => {
  try {
    const response = await api.get('/util/attribute_types')
    const attributeTypes: AttributeType[] = response.data
    dispatch({
      type: FETCH_ATTRIBUTE_TYPES,
      payload: attributeTypes
    })
  } catch (err) {
    dispatch({ type: FETCH_ATTRIBUTE_TYPES, error: err })
    throw err
  }
}

export const setOffline = (offline: boolean): UtilActions => {
  return {
    type: SET_OFFLINE,
    payload: offline
  }
}
