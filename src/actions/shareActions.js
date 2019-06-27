import api from '../api'
import {
  SET_SHARE_ATTRIBUTES,
  SET_SHARE_ATTRIBUTES_SUCCESS,
  SET_SHARE_ATTRIBUTES_FAILURE,
  ENABLE_QR_SHARE,
  DISABLE_QR_SHARE,
  QR_SHARE_ERROR,
  INVITE,
  INVITE_SUCCESS,
  INVITE_FAILURE
} from './types'

export const shareAttributes = (attributes, shareList) => async dispatch => {
  dispatch({ type: SET_SHARE_ATTRIBUTES })

  const shareObject = {
    attribute_shares: attributes,
    contact_ids: shareList.contactList,
    group_ids: shareList.groupList,
    phone_details: shareList.phones,
    email_details: shareList.emails
  }

  try {
    await api.post('/sharing/share_attributes', shareObject)
    dispatch({ type: SET_SHARE_ATTRIBUTES_SUCCESS })
  } catch (err) {
    dispatch({ type: SET_SHARE_ATTRIBUTES_FAILURE, payload: err })
  }
}

export const enableQrShare = uuid => async dispatch => {
  dispatch({ type: ENABLE_QR_SHARE, payload: uuid })

  try {
    await api.patch(`/attribute/${uuid}/enable_qr_share`)
  } catch (err) {
    dispatch({ type: QR_SHARE_ERROR, payload: err })
    dispatch({ type: DISABLE_QR_SHARE, payload: uuid })
  }
}

export const disableQrShare = uuid => async dispatch => {
  dispatch({ type: DISABLE_QR_SHARE, payload: uuid })

  try {
    await api.patch(`/attribute/${uuid}/disable_qr_share`)
  } catch (err) {
    dispatch({ type: QR_SHARE_ERROR, payload: err })
    dispatch({ type: ENABLE_QR_SHARE, payload: uuid })
  }
}

export const inviteContact = request => async dispatch => {
  dispatch({ type: INVITE })

  try {
    console.log(request)
    await api.post('/contact/request_relationship', request)
    dispatch({ type: INVITE_SUCCESS })
  } catch (err) {
    dispatch({ type: INVITE_FAILURE, payload: err })
  }
}
