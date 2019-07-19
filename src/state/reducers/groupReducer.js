import {
  FETCH_GROUP,
  FETCH_GROUP_LIST,
  CREATE_GROUP,
  EDIT_GROUP_NAME,
  EDIT_GROUP_AVATAR,
  INVITE_MEMBERS,
  REMOVE_MEMBERS,
  ADD_MODERATORS,
  REMOVE_MODERATORS,
  ADD_GROUP_SHARE,
  REMOVE_GROUP_SHARE,
  LEAVE_GROUP,
  FETCH_ATTRIBUTE_TYPES_SUCCESS,
  FETCH_GROUP_SUCCESS,
  FETCH_GROUP_LIST_SUCCESS,
  CREATE_GROUP_SUCCESS,
  EDIT_GROUP_NAME_SUCCESS,
  EDIT_GROUP_AVATAR_SUCCESS,
  INVITE_MEMBERS_SUCCESS,
  REMOVE_MEMBERS_SUCCESS,
  ADD_MODERATORS_SUCCESS,
  REMOVE_MODERATORS_SUCCESS,
  LEAVE_GROUP_SUCCESS,
  FETCH_GROUP_FAILURE,
  FETCH_GROUP_LIST_FAILURE,
  CREATE_GROUP_FAILURE,
  EDIT_GROUP_NAME_FAILURE,
  EDIT_GROUP_AVATAR_FAILURE,
  INVITE_MEMBERS_FAILURE,
  REMOVE_MEMBERS_FAILURE,
  ADD_MODERATORS_FAILURE,
  REMOVE_MODERATORS_FAILURE,
  GROUP_SHARE_ERROR,
  LEAVE_GROUP_FAILURE,
  ADD_GROUP_ATTRIBUTE_SUCCESS
} from '../actions/types'

import {
  processSummaries,
  processProfile,
  removeProfile,
  updateShares,
  processAttributes
} from '../../helpers'

const INITIAL_STATE = {
  loading: false,
  error: null,
  requested_at: null,
  groups: null,
  types: null,
  createdGroupUuid: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GROUP_LIST:
    case FETCH_GROUP:
    case CREATE_GROUP:
    case EDIT_GROUP_NAME:
    case EDIT_GROUP_AVATAR:
    case INVITE_MEMBERS:
    case REMOVE_MEMBERS:
    case ADD_MODERATORS:
    case REMOVE_MODERATORS:
    case LEAVE_GROUP:
      return { ...state, loading: true }

    case FETCH_ATTRIBUTE_TYPES_SUCCESS:
      return { ...state, types: action.payload }
    case FETCH_GROUP_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: processSummaries({ ...state.groups }, action.payload.groups),
        requested_at: action.payload.requested_at
      }
    case FETCH_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        groups: processProfile({ ...state.groups }, action.payload, state.types)
      }
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: processSummaries({ ...state.groups }, [action.payload]),
        createdGroupUuid: action.payload.uuid
      }
    case EDIT_GROUP_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: {
          ...state.groups,
          [action.payload.uuid]: {
            ...state.groups[action.payload.uuid],
            name: action.payload.name
          }
        }
      }
    case EDIT_GROUP_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: {
          ...state.groups,
          [action.payload.uuid]: {
            ...state.groups[action.payload.uuid],
            avatar: action.payload.avatar
          }
        }
      }
    case INVITE_MEMBERS_SUCCESS:
    case REMOVE_MEMBERS_SUCCESS:
    case ADD_MODERATORS_SUCCESS:
    case REMOVE_MODERATORS_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case ADD_GROUP_SHARE:
    case REMOVE_GROUP_SHARE:
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.uuid]: updateShares(
            { ...state.groups[action.payload.uuid] },
            action.payload.attribute_uuid,
            action.payload.share_expiry
          )
        }
      }
    case ADD_GROUP_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.groupUuid]: {
            ...state.groups[action.payload.groupUuid],
            ...processAttributes(
              { ...state.groups[action.payload.groupUuid].attributes },
              state.types,
              { action: 'add', data: action.payload.attribute }
            )
          }
        }
      }
    case LEAVE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: removeProfile({ ...state.groups }, action.payload.uuid)
      }

    case FETCH_GROUP_LIST_FAILURE:
    case FETCH_GROUP_FAILURE:
    case CREATE_GROUP_FAILURE:
    case EDIT_GROUP_NAME_FAILURE:
    case EDIT_GROUP_AVATAR_FAILURE:
    case INVITE_MEMBERS_FAILURE:
    case REMOVE_MEMBERS_FAILURE:
    case ADD_MODERATORS_FAILURE:
    case REMOVE_MODERATORS_FAILURE:
    case GROUP_SHARE_ERROR:
    case LEAVE_GROUP_FAILURE:
      return { ...state, loading: false, error: action.payload.message }
    default:
      return state
  }
}
