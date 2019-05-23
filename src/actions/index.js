import api from '../api'
import {
  SWIPED,
  AUTHORIZE,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  FETCH_SETTINGS,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAILURE
} from './types'
import { fetchUserProfile, fetchUserAttributes } from './UserActions'
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

export const fetchSettings = () => async dispatch => {
  dispatch({ type: FETCH_SETTINGS })

  try {
    const response = await api.get('/settings')
    dispatch({ type: FETCH_SETTINGS_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: FETCH_SETTINGS_FAILURE, payload: err })
  }
}

export const loadApplication = () => async dispatch => {
  dispatch({ type: LOAD })

  try {
    await dispatch(fetchSettings())
    let authToken = localStorage.getItem('access_key')
    let userUuid = localStorage.getItem('user_uuid')
    if (authToken && userUuid) {
      // Set auth header on axios instance
      api.defaults.headers.common['access_key'] = authToken
      api.defaults.headers.common['user_uuid'] = userUuid
      dispatch({ type: AUTHORIZE })
      await dispatch(fetchUserProfile())
      await dispatch(fetchUserAttributes())
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
