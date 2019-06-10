import api from '../api'
import {
  SHARE_ATTRIBUTES,
  SHARE_ATTRIBUTES_SUCCESS,
  SHARE_ATTRIBUTES_FAILURE,
  BUILD_SHARE_LIST
} from './types'

export const shareAttributes = (attributes, shareList) => async dispatch => {
  dispatch({ type: SHARE_ATTRIBUTES })

  const shareObject = {
    attribute_shares: attributes,
    contact_ids: shareList.contactList,
    group_ids: shareList.groupList,
    phone_details: shareList.phones,
    email_details: shareList.emails
  }

  try {
    await api.post('/sharing/share_attributes', shareObject)
    dispatch({ type: SHARE_ATTRIBUTES_SUCCESS })
  } catch (err) {
    dispatch({ type: SHARE_ATTRIBUTES_FAILURE, payload: err.response })
  }
}

export const buildShare = shareObject => dispatch => {
  console.log(shareObject)
  dispatch({ type: BUILD_SHARE_LIST, payload: shareObject })
}
