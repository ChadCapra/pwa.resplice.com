import api from '../api'
import {
  SWIPED,
  FETCH_SETTINGS,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAILURE
} from './types'

// Async Action Pattern
// export const name = param => async dispatch => {
//   dispatch({ type: TYPE })

//   try {
//     const response = await api
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
    dispatch({ type: FETCH_SETTINGS_FAILURE, payload: err.message })
  }
}

export * from './AuthActions'
export * from './AttributeActions'
export * from './ContactActions'
export * from './GroupActions'
export * from './UserActions'
