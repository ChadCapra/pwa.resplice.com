import api from '../../api'
import {
  FETCH_SESSIONS,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_FAILURE,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_SUCCESS,
  DOWNLOAD_DATA,
  DOWNLOAD_DATA_SUCCESS,
  DOWNLOAD_DATA_FAILURE,
  ENABLE_NOTIFICATIONS,
  DISABLE_NOTIFICAITONS
} from './types'

export const fetchSessions = () => async dispatch => {
  dispatch({ type: FETCH_SESSIONS })

  try {
    const response = await api.get('/sessions')
    dispatch({
      type: FETCH_SESSIONS_SUCCESS,
      payload: {
        status: response.data.status,
        requested_at: response.data.requested_at,
        list: response.data.ok
      }
    })
  } catch (err) {
    dispatch({ type: FETCH_SESSIONS_FAILURE, payload: err })
  }
}

export const deleteAccount = () => async dispatch => {
  dispatch({ type: DELETE_ACCOUNT })

  try {
    const response = await api.delete('/user/delete')
    dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: response.data })

    localStorage.clear('access_token')
    localStorage.clear('user_uuid')
    // TODO: Clear any items in the local cache (Offline Mode)
  } catch (err) {
    dispatch({ type: DELETE_ACCOUNT_FAILURE, payload: err })
  }
}

export const downloadData = () => async dispatch => {
  dispatch({ type: DOWNLOAD_DATA })

  try {
    const response = await api.get('/user/data')
    dispatch({ type: DOWNLOAD_DATA_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: DOWNLOAD_DATA_FAILURE })
  }
}

export const enableNotifications = () => {
  return { type: ENABLE_NOTIFICATIONS }
  // TODO: Enable notifications client side
}

export const disableNotifications = () => {
  return { type: DISABLE_NOTIFICAITONS }
  // TODO: Disable notifications client side
}
