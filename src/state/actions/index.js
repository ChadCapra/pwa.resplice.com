import api from '../../api'
import {
  SWIPED,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  UPDATE_QUERY,
  CLEAR_QUERY,
  UPDATE_SEARCH_TAGS,
  CLEAR_SEARCH_TAGS
} from './types'
import { fetchAttributeTypes } from './AttributeActions'
import { fetchUserProfile } from './UserActions'
import { fetchGroupList } from './GroupActions'
import { fetchContactList } from './ContactActions'

// Async Action Pattern
// export const name = param => async dispatch => {
//   dispatch({ type: TYPE })

//   try {
//     const response = await api.METHOD(URL, _PARAMS)
//     dispatch({ type: TYPE_SUCCESS, payload: response.data })
//   } catch (err) {
//     dispatch({ type: TYPE_FAILURE, payload: err })
//   }
// }

export const swiped = idx => {
  return {
    type: SWIPED,
    payload: idx
  }
}

export const updateQuery = query => {
  return { type: UPDATE_QUERY, payload: query }
}

export const clearQuery = () => {
  return { type: CLEAR_QUERY }
}

export const updateSearchTags = tags => {
  return { type: UPDATE_SEARCH_TAGS, payload: tags }
}

export const clearSearchTags = () => {
  return { type: CLEAR_SEARCH_TAGS }
}

export const loadApplication = () => async dispatch => {
  dispatch({ type: LOAD })

  try {
    const accessToken = localStorage.getItem('access_token')
    const userUuid = localStorage.getItem('user_uuid')
    if (accessToken && userUuid) {
      // Set auth header on axios instance
      api.defaults.headers.common['access_token'] = accessToken
      api.defaults.headers.common['user_uuid'] = userUuid
      await dispatch(fetchAttributeTypes())
      await dispatch(fetchUserProfile())
      await dispatch(fetchGroupList())
      await dispatch(fetchContactList())
    }

    dispatch({ type: LOAD_SUCCESS })
  } catch (err) {
    dispatch({ type: LOAD_FAILURE, payload: err })
  }
}

export * from './AuthActions'
export * from './AttributeActions'
export * from './ContactActions'
export * from './GroupActions'
export * from './UserActions'
export * from './ShareActions'
export * from './SettingActions'
export * from './ThirdPartyActions'
