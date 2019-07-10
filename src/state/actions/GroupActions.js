import api from '../../api'
import {
  FETCH_GROUP_LIST,
  FETCH_GROUP_LIST_SUCCESS,
  FETCH_GROUP_LIST_FAILURE,
  FETCH_GROUP,
  FETCH_GROUP_SUCCESS,
  FETCH_GROUP_FAILURE,
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  EDIT_GROUP_NAME,
  EDIT_GROUP_NAME_SUCCESS,
  EDIT_GROUP_NAME_FAILURE,
  INVITE_MEMBERS,
  INVITE_MEMBERS_SUCCESS,
  INVITE_MEMBERS_FAILURE,
  REMOVE_MEMBERS,
  REMOVE_MEMBERS_SUCCESS,
  ADD_MODERATORS,
  ADD_MODERATORS_SUCCESS,
  ADD_MODERATORS_FAILURE,
  REMOVE_MODERATORS_SUCCESS,
  REMOVE_MODERATORS,
  REMOVE_MODERATORS_FAILURE,
  ADD_GROUP_SHARE,
  REMOVE_GROUP_SHARE,
  GROUP_SHARE_ERROR,
  LEAVE_GROUP,
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_FAILURE
} from './types'

export const fetchGroupList = () => async dispatch => {
  dispatch({ type: FETCH_GROUP_LIST })

  try {
    const response = await api.get('/groups')
    const { requested_at, ok: groups } = response.data
    dispatch({
      type: FETCH_GROUP_LIST_SUCCESS,
      payload: { requested_at, groups }
    })
  } catch (err) {
    dispatch({ type: FETCH_GROUP_LIST_FAILURE, payload: err })
  }
}

export const fetchGroup = uuid => async dispatch => {
  dispatch({ type: FETCH_GROUP })

  try {
    const response = await api.get(`/group/${uuid}`)
    const { ok: details, requested_at } = response.data
    dispatch({
      type: FETCH_GROUP_SUCCESS,
      payload: { ...details, requested_at }
    })
  } catch (err) {
    dispatch({ type: FETCH_GROUP_FAILURE, payload: err })
  }
}

export const createGroup = group => async dispatch => {
  dispatch({ type: CREATE_GROUP })

  try {
    const response = await api.post('/group/create', group)
    const { ok: summary, requested_at } = response.data
    dispatch({
      type: CREATE_GROUP_SUCCESS,
      payload: { ...summary, requested_at }
    })
  } catch (err) {
    dispatch({ type: CREATE_GROUP_FAILURE, payload: err })
  }
}

export const editName = (uuid, name) => async dispatch => {
  dispatch({ type: EDIT_GROUP_NAME })

  try {
    const response = await api.patch(`/group/${uuid}edit_name`, { name })
    dispatch({
      type: EDIT_GROUP_NAME_SUCCESS,
      payload: { uuid, name: response.data.ok }
    })
  } catch (err) {
    dispatch({ type: EDIT_GROUP_NAME_FAILURE, payload: err })
  }
}

export const editAvatar = (uuid, avatar) => async dispatch => {
  dispatch({ type: EDIT_GROUP_NAME })

  try {
    const response = await api.patch(`/group/${uuid}edit_avatar`, { avatar })
    dispatch({
      type: EDIT_GROUP_NAME_SUCCESS,
      payload: { uuid, avatar: response.data.ok }
    })
  } catch (err) {
    dispatch({ type: EDIT_GROUP_NAME_FAILURE, payload: err })
  }
}

export const inviteMembers = (uuid, members) => async dispatch => {
  dispatch({ type: INVITE_MEMBERS })

  try {
    await api.post(`group/${uuid}/invite_members`, {
      invitees: members
    })
    dispatch({ type: INVITE_MEMBERS_SUCCESS })
    dispatch(fetchGroup(uuid))
  } catch (err) {
    dispatch({ type: INVITE_MEMBERS_FAILURE, payload: err })
  }
}

export const removeMembers = (uuid, member_uuids) => async dispatch => {
  dispatch({ type: REMOVE_MEMBERS })

  try {
    await api.delete(`group/${uuid}/remove_members`, {
      contact_uuids: member_uuids
    })
    dispatch({ type: REMOVE_MEMBERS_SUCCESS })
    dispatch(fetchGroup(uuid))
  } catch (err) {
    dispatch({ type: REMOVE_MEMBERS_SUCCESS, payload: err })
  }
}

export const addModerators = (uuid, member_uuids) => async dispatch => {
  dispatch({ type: ADD_MODERATORS })

  try {
    await api.post(`/group/${uuid}/add_moderators`, {
      contact_uuids: member_uuids
    })
    dispatch({ type: ADD_MODERATORS_SUCCESS })
    dispatch(fetchGroup(uuid))
  } catch (err) {
    dispatch({ type: ADD_MODERATORS_FAILURE, payload: err })
  }
}

export const removeModerators = (uuid, member_uuids) => async dispatch => {
  dispatch({ type: REMOVE_MODERATORS })

  try {
    await api.delete(`/group/${uuid}/remove_moderators`, {
      contact_uuids: member_uuids
    })
    dispatch({ type: REMOVE_MODERATORS_SUCCESS })
    dispatch(fetchGroup(uuid))
  } catch (err) {
    dispatch({ type: REMOVE_MODERATORS_FAILURE, payload: err })
  }
}

export const addShare = (
  uuid,
  attribute_uuid,
  share_expiry
) => async dispatch => {
  dispatch({ type: ADD_GROUP_SHARE, payload: attribute_uuid })

  try {
    await api.patch(`/group/${uuid}/add_share`, {
      attribute_uuid,
      share_expiry
    })
  } catch (err) {
    dispatch({ type: GROUP_SHARE_ERROR, payload: err })
    dispatch({ type: REMOVE_GROUP_SHARE, payload: attribute_uuid })
  }
}

export const removeShare = (uuid, attribute_uuid) => async dispatch => {
  dispatch({ type: REMOVE_GROUP_SHARE, payload: attribute_uuid })

  try {
    await api.patch(`/group/${uuid}/remove_share`, { attribute_uuid })
  } catch (err) {
    dispatch({ type: GROUP_SHARE_ERROR, payload: err })
    dispatch({ type: ADD_GROUP_SHARE, payload: attribute_uuid })
  }
}

export const leaveGroup = uuid => async dispatch => {
  dispatch({ type: LEAVE_GROUP })

  try {
    await api.delete(`/group/${uuid}/leave_group`)
    dispatch({ type: LEAVE_GROUP_SUCCESS, payload: { uuid } })
  } catch (err) {
    dispatch({ type: LEAVE_GROUP_FAILURE, payload: err })
  }
}
