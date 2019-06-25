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
  FETCH_SESSIONS,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_FAILURE,
  UPDATE_NAME,
  UPDATE_NAME_FAILURE
} from '../actions/types'

import { processAttributes } from '../helpers'

const INITIAL_STATE = {
  loading: false,
  error: null,
  loaded_at: null,
  profile: {},
  attributes: {},
  collections: {},
  types: {},
  settings: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_PROFILE:
    case FETCH_PROFILE:
      return { ...state, loading: true }
    case CREATE_PROFILE_SUCCESS:
    case FETCH_PROFILE_SUCCESS:
      const { attributes, request_at, ...profile } = action.payload.ok
      return {
        ...state,
        loading: false,
        loaded_at: request_at,
        profile,
        ...processAttributes({ ...attributes }, state.types)
      }
    case CREATE_PROFILE_FAILURE:
    case FETCH_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case FETCH_ATTRIBUTE_TYPES_SUCCESS:
      return { ...state, types: action.payload.ok }
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
    case FETCH_SESSIONS:
      return { ...state, loading: true }
    case FETCH_SESSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        settings: { ...state.settings, sessions: action.payload }
      }
    case FETCH_SESSIONS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case UPDATE_NAME:
      return { ...state, profile: { ...state.profile, name: action.payload } }
    case UPDATE_NAME_FAILURE:
      return {
        ...state,
        profile: { ...state.profile, name: action.payload.oldName },
        error: action.payload.err
      }
    default:
      return state
  }
}
