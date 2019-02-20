import {
  SHARE_ATTRIBUTES,
  SHARE_ATTRIBUTES_SUCCESS,
  SHARE_ATTRIBUTES_FAILURE,
  ADD_CONTACTS_TO_SHARES,
  ADD_PHONES_TO_SHARES,
  ADD_EMAILS_TO_SHARES
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  contact_ids: [],
  group_ids: [],
  phone_details: [],
  email_details: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHARE_ATTRIBUTES:
      return { ...state, loading: true }
    case SHARE_ATTRIBUTES_SUCCESS:
      return { ...state, loading: false }
    case SHARE_ATTRIBUTES_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
    case ADD_CONTACTS_TO_SHARES:
      return { ...state, contact_ids: action.payload }
    case ADD_PHONES_TO_SHARES:
      return { ...state, phone_details: action.payload }
    case ADD_EMAILS_TO_SHARES:
      return { ...state, email_details: action.payload }
    default:
      return state
  }
}
