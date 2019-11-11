import api, { mockApi } from '../../api'
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
  REMOVE_MEMBER,
  REMOVE_MEMBER_SUCCESS,
  ADD_MODERATOR,
  ADD_MODERATOR_SUCCESS,
  ADD_MODERATOR_FAILURE,
  REMOVE_MODERATOR_SUCCESS,
  REMOVE_MODERATOR,
  REMOVE_MODERATOR_FAILURE,
  ADD_GROUP_SHARE,
  REMOVE_GROUP_SHARE,
  GROUP_SHARE_ERROR,
  LEAVE_GROUP,
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_FAILURE
} from './types'
import { objectArrToDict } from '../../helpers'

export const fetchGroupList = () => async dispatch => {
  dispatch({ type: FETCH_GROUP_LIST })

  try {
    const response = await mockApi.get('/groups')
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
    const response = await mockApi.get(`/group/${uuid}`)
    const {
      ok: { attributes, shares, ...profile },
      requested_at
    } = response.data
    profile.attributes = objectArrToDict(attributes, 'uuid')
    profile.shares = objectArrToDict(shares, 'attribute_uuid')
    dispatch({
      type: FETCH_GROUP_SUCCESS,
      payload: { profile, requested_at }
    })
  } catch (err) {
    console.log(err)
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

export const editGroupName = (uuid, name) => async dispatch => {
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

export const editGroupAvatar = (uuid, avatar) => async dispatch => {
  dispatch({ type: EDIT_GROUP_NAME })

  try {
    const response = await api.patch(`/group/${uuid}/edit_avatar`, { avatar })
    dispatch({
      type: EDIT_GROUP_NAME_SUCCESS,
      payload: { uuid, avatar: response.data.ok }
    })
  } catch (err) {
    dispatch({ type: EDIT_GROUP_NAME_FAILURE, payload: err })
  }
}

export const inviteMember = (uuid, phone_or_email) => async dispatch => {
  dispatch({ type: INVITE_MEMBERS })

  try {
    await api.patch(`group/${uuid}/invite_member`, {
      phone_or_email
    })
    dispatch({ type: INVITE_MEMBERS_SUCCESS })
    dispatch(fetchGroup(uuid))
  } catch (err) {
    dispatch({ type: INVITE_MEMBERS_FAILURE, payload: err })
  }
}

export const removeMember = (uuid, member_uuid) => async dispatch => {
  dispatch({ type: REMOVE_MEMBER })

  try {
    await api.patch(`group/${uuid}/remove_members`, {
      contact_uuids: member_uuid
    })
    dispatch({ type: REMOVE_MEMBER_SUCCESS })
    dispatch(fetchGroup(uuid))
  } catch (err) {
    dispatch({ type: REMOVE_MEMBER_SUCCESS, payload: err })
  }
}

export const addModerator = (uuid, member_uuid) => async dispatch => {
  dispatch({ type: ADD_MODERATOR })

  try {
    await api.patch(`/group/${uuid}/add_moderators`, {
      contact_uuids: member_uuid
    })
    dispatch({ type: ADD_MODERATOR_SUCCESS })
    dispatch(fetchGroup(uuid))
  } catch (err) {
    dispatch({ type: ADD_MODERATOR_FAILURE, payload: err })
  }
}

export const removeModerator = (uuid, member_uuid) => async dispatch => {
  dispatch({ type: REMOVE_MODERATOR })

  try {
    await api.patch(`/group/${uuid}/remove_moderators`, {
      contact_uuids: member_uuid
    })
    dispatch({ type: REMOVE_MODERATOR_SUCCESS })
    dispatch(fetchGroup(uuid))
  } catch (err) {
    dispatch({ type: REMOVE_MODERATOR_FAILURE, payload: err })
  }
}

export const addGroupShare = (uuid, share) => async dispatch => {
  dispatch({ type: ADD_GROUP_SHARE, payload: { uuid, ...share } })

  try {
    await api.patch(`/group/${uuid}/add_share`, share)
  } catch (err) {
    dispatch({ type: GROUP_SHARE_ERROR, payload: err })
    dispatch({ type: REMOVE_GROUP_SHARE, payload: { uuid, ...share } })
  }
}

export const removeGroupShare = (uuid, share) => async dispatch => {
  dispatch({ type: REMOVE_GROUP_SHARE, payload: { uuid, ...share } })

  try {
    await api.patch(`/group/${uuid}/remove_share`, {
      attribute_uuid: share.attribute_uuid
    })
  } catch (err) {
    dispatch({ type: GROUP_SHARE_ERROR, payload: err })
    dispatch({ type: ADD_GROUP_SHARE, payload: { uuid, ...share } })
  }
}

export const leaveGroup = uuid => async dispatch => {
  dispatch({ type: LEAVE_GROUP })

  try {
    await api.patch(`/group/${uuid}/leave_group`)
    dispatch({ type: LEAVE_GROUP_SUCCESS, payload: { uuid } })
  } catch (err) {
    dispatch({ type: LEAVE_GROUP_FAILURE, payload: err })
  }
}
