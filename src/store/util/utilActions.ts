import { RespliceState } from '../store'
import { AttributeType, UtilActions, FETCH_ATTRIBUTE_TYPES } from './types'
import { ThunkAction } from 'redux-thunk'
import api from '../../api'

export const fetchAttributeTypes = (): ThunkAction<
  void,
  RespliceState,
  null,
  UtilActions
> => async dispatch => {
  dispatch({ type: FETCH_ATTRIBUTE_TYPES, loading: true })
  try {
    const response = await api.get('/util/attribute_types')
    const attributeTypes: AttributeType[] = response.data
    dispatch({
      type: FETCH_ATTRIBUTE_TYPES,
      payload: attributeTypes
    })
  } catch (err) {
    dispatch({ type: FETCH_ATTRIBUTE_TYPES, error: err })
  }
}
