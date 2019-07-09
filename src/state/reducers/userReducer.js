import {
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  CREATE_PROFILE,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
  FETCH_ATTRIBUTE_TYPES_SUCCESS,
  ADD_ATTRIBUTE_SUCCESS,
  EDIT_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_SUCCESS,
  ENABLE_QR_SHARE,
  DISABLE_QR_SHARE,
  GENERATE_QR_PIN_SUCCESS,
  FETCH_SESSIONS,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_FAILURE,
  EDIT_NAME,
  EDIT_NAME_SUCCESS,
  EDIT_NAME_FAILURE,
  EDIT_AVATAR,
  EDIT_AVATAR_SUCCESS,
  EDIT_AVATAR_FAILURE
} from '../actions/types'

import { processAttributes } from '../../helpers'

const INITIAL_STATE = {
  loading: false,
  error: null,
  requested_at: null,
  profile: null,
  attributes: null,
  collections: null,
  types: null,
  settings: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_PROFILE:
    case FETCH_PROFILE:
    case FETCH_SESSIONS:
    case EDIT_NAME:
    case EDIT_AVATAR:
      return { ...state, loading: true }

    case CREATE_PROFILE_SUCCESS:
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        requested_at: action.payload.requested_at,
        profile: action.payload.profile,
        ...processAttributes(action.payload.attributes, state.types)
      }
    case FETCH_ATTRIBUTE_TYPES_SUCCESS:
      return { ...state, types: action.payload }
    case ADD_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        ...processAttributes({ ...state.attributes }, state.types, {
          action: 'add',
          data: action.payload.ok
        })
      }
    case EDIT_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        ...processAttributes({ ...state.attributes }, state.types, {
          action: 'edit',
          data: action.payload.ok
        })
      }
    case DELETE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        ...processAttributes({ ...state.attributes }, state.types, {
          action: 'delete',
          data: action.payload.ok
        })
      }
    case ENABLE_QR_SHARE:
      return {
        ...state,
        ...processAttributes({ ...state.attributes }, state.types, {
          action: 'toggleShareOn',
          data: action.payload
        })
      }
    case DISABLE_QR_SHARE:
      return {
        ...state,
        ...processAttributes({ ...state.attributes }, state.types, {
          action: 'toggleShareOff',
          data: action.payload
        })
      }
    case GENERATE_QR_PIN_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, qr_pin: action.payload.ok }
      }
    case FETCH_SESSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        settings: { ...state.settings, sessions: action.payload }
      }
    case EDIT_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: { ...state.profile, name: action.payload.name }
      }
    case EDIT_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: { ...action.payload.profile, avatar: action.payload.avatar }
      }

    case CREATE_PROFILE_FAILURE:
    case FETCH_PROFILE_FAILURE:
    case FETCH_SESSIONS_FAILURE:
    case EDIT_NAME_FAILURE:
    case EDIT_AVATAR_FAILURE:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
