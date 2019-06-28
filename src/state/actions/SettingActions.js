import api from '../../api'
import {
  FETCH_SESSIONS,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_FAILURE
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
