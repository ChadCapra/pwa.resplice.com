import api from '../../api'
import {
  SET_SHARE_ATTRIBUTES,
  SET_SHARE_ATTRIBUTES_SUCCESS,
  SET_SHARE_ATTRIBUTES_FAILURE,
  ENABLE_QR_SHARE,
  DISABLE_QR_SHARE,
  QR_SHARE_ERROR,
  GENERATE_QR_PIN,
  GENERATE_QR_PIN_SUCCESS,
  GENERATE_QR_PIN_FAILURE,
  INVITE,
  INVITE_SUCCESS,
  INVITE_FAILURE,
  SET_BULK_SHARES
} from './types'

export const enableQrShare = uuid => async dispatch => {
  dispatch({ type: ENABLE_QR_SHARE, payload: { uuid } })

  try {
    await api.patch(`/attribute/${uuid}/enable_qr_share`)
  } catch (err) {
    dispatch({ type: QR_SHARE_ERROR, payload: err })
    dispatch({ type: DISABLE_QR_SHARE, payload: { uuid } })
  }
}

export const disableQrShare = uuid => async dispatch => {
  dispatch({ type: DISABLE_QR_SHARE, payload: { uuid } })

  try {
    await api.patch(`/attribute/${uuid}/disable_qr_share`)
  } catch (err) {
    dispatch({ type: QR_SHARE_ERROR, payload: err })
    dispatch({ type: ENABLE_QR_SHARE, payload: { uuid } })
  }
}

export const generateQrPin = () => async dispatch => {
  dispatch({ type: GENERATE_QR_PIN })

  try {
    const response = await api.post('/generate_qr_pin')
    console.log(response)
    dispatch({ type: GENERATE_QR_PIN_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: GENERATE_QR_PIN_FAILURE, payload: err })
  }
}

export const inviteContact = request => async dispatch => {
  dispatch({ type: INVITE })

  try {
    console.log(request)
    await api.post('/contact/invite', request)
    dispatch({ type: INVITE_SUCCESS })
  } catch (err) {
    dispatch({ type: INVITE_FAILURE, payload: err })
  }
}

export const setBulkShares = uuids => {
  return { type: SET_BULK_SHARES, payload: uuids }
}
