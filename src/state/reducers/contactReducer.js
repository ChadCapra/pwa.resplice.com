import {
  FETCH_ATTRIBUTE_TYPES_SUCCESS,
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
} from '../actions/types'

import {
  processProfile,
  processSummaries,
  updateShares,
  updateTags,
  removeProfile
} from '../../helpers'

const INITIAL_STATE = {
  contacts: null,
  attributes: null,
  shares: null,
  contacts_loaded_at: null,
  attributes_loaded_at: null,
  shares_loaded_at: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ATTRIBUTE_TYPES_SUCCESS:
      return { ...state, types: action.payload }
    case FETCH_CONTACT_LIST:
      return { ...state, loading: true }
    case FETCH_CONTACT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: processSummaries(
          { ...state.contacts },
          action.payload.contacts
        ),
        requested_at: action.payload.requested_at
      }
    case FETCH_CONTACT_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case FETCH_CONTACT:
      return { ...state, loading: true, error: null }
    case FETCH_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: processProfile(
          { ...state.contacts },
          action.payload,
          state.types
        )
      }
    case FETCH_CONTACT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case UNLOCK_CONTACT:
      return { ...state, loading: true }
    case UNLOCK_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: processSummaries({ ...state.contacts }, [action.payload.ok])
      }
    case UNLOCK_CONTACT_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case ADD_TAG:
    case REMOVE_TAG:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [action.payload.uuid]: updateTags(
            ...state.contacts[action.payload.uuid],
            action.payload.tag
          )
        }
      }
    case TAG_ERROR:
      return { ...state, error: action.payload }
    case ADD_SHARE:
    case REMOVE_SHARE:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [action.payload.uuid]: updateShares(
            { ...state.contacts[action.payload.uuid] },
            action.payload.share.attribute_uuid,
            action.payload.share.share_expiry
          )
        }
      }
    case SHARE_ERROR:
      return { ...state, error: action.payload }
    case DECLINE_PENDING:
      return { ...state, loading: true }
    case DECLINE_PENDING_SUCCESS:
      if (action.payload.ok) {
        return {
          ...state,
          loading: false,
          contacts: processProfile(
            { ...state.contacts },
            {
              profile: action.payload.ok.contact,
              requested_at: action.payload.requested_at
            },
            state.types
          )
        }
      }
      return {
        ...state,
        loading: false,
        contacts: removeProfile(...state.contacts, action.payload.uuid)
      }
    case DECLINE_PENDING_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case DELETE_CONTACT:
      return { ...state, loading: true }
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: removeProfile(...state.contacts, action.payload.uuid)
      }
    case DELETE_CONTACT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
