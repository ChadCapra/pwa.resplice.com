import {
  ContactState,
  ContactActions,
  FETCH_CONTACTS,
  FETCH_CONTACT,
  INVITE_CONTACT,
  UNLOCK_CONTACT,
  SET_CONTACT_INFO,
  ADD_CONTACT_TAG,
  REMOVE_CONTACT_TAG,
  DELETE_CONTACT,
  FETCH_CONTACT_ATTRIBUTES,
  FETCH_CONTACT_ATTRIBUTE
} from './types'

import { omit } from '../../helpers'

const INITIAL_STATE: ContactState = {
  loading: false,
  error: null,
  contacts: null,
  contacts_loaded_at: null
}

export default (
  state = INITIAL_STATE,
  action: ContactActions
): ContactState => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return {
        ...state,
        contacts: action.payload || state.contacts,
        loading: action.loading || false,
        error: action.error || null
      }
    case FETCH_CONTACT:
    case INVITE_CONTACT:
    case UNLOCK_CONTACT:
      return {
        ...state,
        contacts:
          (action.payload && {
            ...state.contacts,
            [action.payload.uuid]: action.payload
          }) ||
          state.contacts,
        loading: action.loading || false,
        error: action.error || null
      }
    case SET_CONTACT_INFO:
    case ADD_CONTACT_TAG:
    case REMOVE_CONTACT_TAG:
      return {
        ...state,
        contacts:
          (action.payload && {
            ...state.contacts,
            [action.payload.uuid]: {
              ...state.contacts![action.payload.uuid],
              ...action.payload
            }
          }) ||
          state.contacts,
        loading: action.loading || false,
        error: action.error || null
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts:
          (action.payload &&
            state.contacts &&
            omit(action.payload, state.contacts)) ||
          state.contacts,
        loading: action.loading || false,
        error: action.error || null
      }
    // case FETCH_CONTACTS_ATTRIBUTES:
    case FETCH_CONTACT_ATTRIBUTES:
      return {
        ...state,
        contacts:
          (action.payload && {
            ...state.contacts,
            [action.payload.uuid]: {
              ...state.contacts![action.payload.uuid],
              attributes: action.payload.attributes
            }
          }) ||
          state.contacts,
        loading: action.loading || false,
        error: action.error || null
      }
    case FETCH_CONTACT_ATTRIBUTE:
      return {
        ...state,
        contacts:
          (action.payload && {
            ...state.contacts,
            [action.payload.uuid]: {
              ...state.contacts![action.payload.uuid],
              attributes: {
                ...state.contacts![action.payload.uuid].attributes,
                [action.payload.attribute.uuid]: action.payload.attribute
              }
            }
          }) ||
          state.contacts,
        loading: action.loading || false,
        error: action.error || null
      }
    // TODO: Implement the rest of the payloads
    default:
      return state
  }
}
