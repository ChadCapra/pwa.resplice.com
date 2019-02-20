import api from '../api'
import {
  SHARE_ATTRIBUTES,
  SHARE_ATTRIBUTES_SUCCESS,
  SHARE_ATTRIBUTES_FAILURE,
  ADD_CONTACTS_TO_SHARES,
  ADD_PHONES_TO_SHARES,
  ADD_EMAILS_TO_SHARES
} from './types'

export const shareAttributes = attributes => async (dispatch, getState) => {
  dispatch({ type: SHARE_ATTRIBUTES })

  const shareObject = {
    attribute_shares: attributes,
    contact_ids: getState().contact_ids,
    group_ids: getState().groupids,
    phone_details: getState().phone_details,
    email_details: getState().email_details
  }

  try {
    await api.post('/sharing/share_attributes', shareObject)
    dispatch({ type: SHARE_ATTRIBUTES_SUCCESS })
  } catch (err) {
    dispatch({ type: SHARE_ATTRIBUTES_FAILURE, payload: err.response })
  }
}

export const buildShare = (contact_ids, phones, emails) => dispatch => {
  dispatch({ type: ADD_CONTACTS_TO_SHARES, payload: contact_ids })
  dispatch({ type: ADD_PHONES_TO_SHARES, payload: phones })
  dispatch({ type: ADD_EMAILS_TO_SHARES, payload: emails })
}
