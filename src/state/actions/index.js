import api from '../../api'
import { SWIPED, LOAD, LOAD_SUCCESS, LOAD_FAILURE } from './types'
import { fetchUserProfile } from './UserActions'
import { fetchContactList } from './ContactActions'
import { fetchAttributeTypes } from './AttributeActions'

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
