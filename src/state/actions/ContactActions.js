import api from '../../api'
import {
  FETCH_CONTACT_LIST,
  FETCH_CONTACT_LIST_SUCCESS,
  FETCH_CONTACT_LIST_FAILURE,
  FETCH_CONTACT,
  FETCH_CONTACT_SUCCESS,
  FETCH_CONTACT_FAILURE,
  UNLOCK_CONTACT,
  UNLOCK_CONTACT_SUCCESS,
  UNLOCK_CONTACT_FAILURE,
  ADD_TAG,
  REMOVE_TAG,
  TAG_ERROR,
  ADD_SHARE,
  REMOVE_SHARE,
  SHARE_ERROR,
  DECLINE_PENDING,
  DECLINE_PENDING_SUCCESS,
  DECLINE_PENDING_FAILURE,
  DELETE_CONTACT,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE
} from './types'
import { contact, generateProfileList } from './mockData'

export const fetchContactList = () => async dispatch => {
  dispatch({ type: FETCH_CONTACT_LIST })

  try {
    // const response = await api.get('/contacts')
    // dispatch({ type: FETCH_CONTACT_LIST_SUCCESS, payload: response.data })
    dispatch({
      type: FETCH_CONTACT_LIST_SUCCESS,
      payload: { ok: generateProfileList() }
    })
  } catch (err) {
    console.log(err)
    dispatch({ type: FETCH_CONTACT_LIST_FAILURE, payload: err.response })
  }
}

export const fetchContact = uuid => async dispatch => {
  dispatch({ type: FETCH_CONTACT })

  try {
    // const response = await api.get(`/contact/${uuid}`)
    // dispatch({ type: FETCH_CONTACT_SUCCESS, payload: response.data })
    dispatch({
      type: FETCH_CONTACT_SUCCESS,
      payload: { ok: contact, requested_at: contact.requested_at }
    })
  } catch (err) {
    console.log(err)
    dispatch({ type: FETCH_CONTACT_FAILURE, payload: err.response })
  }
}

export const unlockContact = (uuid, qr_pin) => async dispatch => {
  dispatch({ type: UNLOCK_CONTACT })

  try {
    const response = api.post(`/contact/unlock`, { contact_uuid: uuid, qr_pin })
    // Add summary into summary dictionary, then navigate to contact page
    dispatch({ type: UNLOCK_CONTACT_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: UNLOCK_CONTACT_FAILURE, payload: err })
  }
}

export const addTag = (uuid, tag) => async dispatch => {
  dispatch({ type: ADD_TAG, payload: { uuid, tag } })

  try {
    await api.patch(`/contact/${uuid}/add_tag`, { tag })
  } catch (err) {
    dispatch({ type: TAG_ERROR, payload: err })
    dispatch({ type: REMOVE_TAG, payload: { uuid, tag } })
  }
}

export const removeTag = (uuid, tag) => async dispatch => {
  dispatch({ type: REMOVE_TAG, payload: tag })

  try {
    await api.patch(`/contact/${uuid}/remove_tag`, { tag })
  } catch (err) {
    dispatch({ type: TAG_ERROR, payload: err })
    dispatch({ type: ADD_TAG, payload: tag })
  }
}

export const addShare = (
  uuid,
  attribute_uuid,
  share_expiry
) => async dispatch => {
  dispatch({ type: ADD_SHARE, payload: { uuid, attribute_uuid, share_expiry } })

  try {
    await api.patch(`/contact/${uuid}/add_share`, {
      attribute_uuid,
      share_expiry
    })
  } catch (err) {
    dispatch({ type: SHARE_ERROR, payload: err })
    dispatch({ type: REMOVE_SHARE, payload: attribute_uuid })
  }
}

export const removeShare = (uuid, attribute_uuid) => async dispatch => {
  dispatch({ type: REMOVE_SHARE, payload: attribute_uuid })

  try {
    await api.patch(`/contact/${uuid}/remove_share`, { attribute_uuid })
  } catch (err) {
    dispatch({ type: SHARE_ERROR, payload: err })
    dispatch({ type: ADD_SHARE, payload: attribute_uuid })
  }
}

export const declinePending = uuid => async dispatch => {
  dispatch({ type: DECLINE_PENDING })

  try {
    const response = await api.delete(`/contact/${uuid}/decline_pending`)
    dispatch({
      type: DECLINE_PENDING_SUCCESS,
      payload: {
        ok: response.data.ok,
        requested_at: response.data.requested_at,
        uuid
      }
    })
  } catch (err) {
    dispatch({ type: DECLINE_PENDING_FAILURE, payload: err })
  }
}

export const deleteContact = uuid => async dispatch => {
  dispatch({ type: DELETE_CONTACT })

  try {
    await api.delete(`/contact/${uuid}/delete_contact`)
    dispatch({ type: DELETE_CONTACT_SUCCESS, payload: { uuid } })
  } catch (err) {
    dispatch({ type: DELETE_CONTACT_FAILURE, payload: err })
  }
}
