import {
  GENERATE_QR_PIN,
  INVITE,
  ADD_SHARE_BULK,
  REMOVE_SHARE_BULK,
  SET_BULK_SHARES,
  INVITE_SUCCESS,
  QR_SHARE_ERROR,
  GENERATE_QR_PIN_FAILURE,
  INVITE_FAILURE
} from '../actions/types'

import { updateAttrUuids } from '../../helpers'

const INITIAL_STATE = {
  loading: false,
  error: null,
  shareList: [
    {
      uuid: 'a43e9f5b-7035-4fc8-8f70-03404aaf5a93',
      name: 'Cindy Wu',
      avatar: 'https://i.pravatar.cc/300?img=40'
    },
    {
      uuid: 'a43e9f5b-7035-4fc8-8f70-03404aaf5a94',
      name: 'Jennifer Johnson',
      avatar: 'https://i.pravatar.cc/300?img=43'
    }
  ],
  attribute_uuids: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GENERATE_QR_PIN:
    case INVITE:
      return { ...state, loading: true }

    case ADD_SHARE_BULK:
    case REMOVE_SHARE_BULK:
      return {
        ...state,
        attribute_uuids: updateAttrUuids(
          ...state.attribute_uuids,
          action.payload.uuid
        )
      }
    case SET_BULK_SHARES:
      return { ...state, shareList: action.payload }
    case INVITE_SUCCESS:
      return { ...state, loading: false }

    case QR_SHARE_ERROR:
    case GENERATE_QR_PIN_FAILURE:
    case INVITE_FAILURE:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
