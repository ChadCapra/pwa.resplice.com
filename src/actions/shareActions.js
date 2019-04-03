import api from '../api'
import {
  SHARE_ATTRIBUTES,
  SHARE_ATTRIBUTES_SUCCESS,
  SHARE_ATTRIBUTES_FAILURE,
  ADD_CONTACTS_TO_SHARES,
  ADD_PHONES_TO_SHARES,
  ADD_EMAILS_TO_SHARES,
  BUILD_SHARE_LIST,
  TOGGLE_ATTRIBUTE_SHARE_LIST
} from './types'

export const shareAttributes = attributes => async (dispatch, getState) => {
  dispatch({ type: SHARE_ATTRIBUTES })

  const shareObject = {
    attribute_shares: attributes,
    contact_ids: getState().shares.contact_ids,
    group_ids: getState().shares.group_ids,
    phone_details: getState().shares.phone_details,
    email_details: getState().shares.email_details
  }

  try {
    await api.post('/sharing/share_attributes', shareObject)
    dispatch({ type: SHARE_ATTRIBUTES_SUCCESS })
  } catch (err) {
    dispatch({ type: SHARE_ATTRIBUTES_FAILURE, payload: err.response })
  }
}

export const buildShare = (list, contact_ids, phones, emails) => dispatch => {
  dispatch({ type: BUILD_SHARE_LIST, payload: list })
  dispatch({ type: ADD_CONTACTS_TO_SHARES, payload: contact_ids })
  dispatch({ type: ADD_PHONES_TO_SHARES, payload: phones })
  dispatch({ type: ADD_EMAILS_TO_SHARES, payload: emails })
}

export const toggleAttributeToShares = attribute => {
  return { type: TOGGLE_ATTRIBUTE_SHARE_LIST, payload: attribute }
}
