import { RespliceState } from '../store'
import {
  UserProfile,
  UserAttribute,
  UserActions,
  FETCH_USER_PROFILE,
  EDIT_USER_NAME,
  EDIT_USER_AVATAR,
  DELETE_USER,
  FETCH_USER_ATTRIBUTES,
  FETCH_USER_ATTRIBUTE,
  ADD_USER_ATTRIBUTE,
  EDIT_USER_ATTRIBUTE,
  VERIFY_USER_ATTRIBUTE,
  TOGGLE_QR_SHARABLE,
  DELETE_USER_ATTRIBUTE
} from './types'
import { ThunkAction } from 'redux-thunk'
import api from '../../api'

export const fetchUserProfile = (): ThunkAction<
  Promise<void>,
  RespliceState,
  null,
  UserActions
> => async dispatch => {
  dispatch({ type: FETCH_USER_PROFILE, loading: true })
  try {
    const response = await api.get('/user/profile')
    const profile: UserProfile = response.data.user
    dispatch({
      type: FETCH_USER_PROFILE,
      payload: profile
    })
  } catch (err) {
    dispatch({ type: FETCH_USER_PROFILE, error: err })
    throw err
  }
}

export const editUserName = (
  name: string
): ThunkAction<void, RespliceState, null, UserActions> => async dispatch => {
  dispatch({ type: EDIT_USER_NAME, loading: true })
  try {
    const response = await api.patch('/user/edit_name', name)
    const profile: UserProfile = response.data
    dispatch({
      type: EDIT_USER_NAME,
      payload: profile
    })
  } catch (err) {
    dispatch({ type: EDIT_USER_NAME, error: err })
  }
}

export const editUserAvatar = (
  avatar: File
): ThunkAction<void, RespliceState, null, UserActions> => async dispatch => {
  dispatch({ type: EDIT_USER_AVATAR, loading: true })
  try {
    const response = await api.patch('/user/edit_avatar')
    const profile: UserProfile = response.data
    dispatch({
      type: EDIT_USER_AVATAR,
      payload: profile
    })
  } catch (err) {
    dispatch({ type: EDIT_USER_AVATAR, error: err })
  }
}

export const deleteUser = (): ThunkAction<
  void,
  RespliceState,
  null,
  UserActions
> => async dispatch => {
  dispatch({ type: DELETE_USER, loading: true })
  try {
    await api.delete('/user/delete')
    dispatch({
      type: DELETE_USER
    })
  } catch (err) {
    dispatch({ type: DELETE_USER, error: err })
  }
}

export const fetchUserAttributes = (): ThunkAction<
  void,
  RespliceState,
  null,
  UserActions
> => async dispatch => {
  dispatch({ type: FETCH_USER_ATTRIBUTES, loading: true })
  try {
    const response = await api.get('/user/attributes/get')
    const attributes: UserAttribute[] = response.data
    dispatch({
      type: FETCH_USER_ATTRIBUTES,
      payload: attributes
    })
  } catch (err) {
    dispatch({ type: FETCH_USER_ATTRIBUTES, error: err })
  }
}

export const fetchUserAttribute = (
  uuid: string
): ThunkAction<void, RespliceState, null, UserActions> => async dispatch => {
  dispatch({ type: FETCH_USER_ATTRIBUTE, loading: true })
  try {
    const response = await api.get(`/user/attributes/${uuid}/get`)
    const attribute: UserAttribute = response.data[0]
    dispatch({
      type: FETCH_USER_ATTRIBUTE,
      payload: attribute
    })
  } catch (err) {
    dispatch({ type: FETCH_USER_ATTRIBUTE, error: err })
  }
}

export const addUserAttribute = (
  attribute: UserAttribute
): ThunkAction<void, RespliceState, null, UserActions> => async dispatch => {
  dispatch({ type: ADD_USER_ATTRIBUTE, loading: true })
  try {
    const response = await api.post('/user/attributes/add', attribute)
    const newAttribute: UserAttribute = response.data
    dispatch({
      type: ADD_USER_ATTRIBUTE,
      payload: newAttribute
    })
  } catch (err) {
    dispatch({ type: ADD_USER_ATTRIBUTE, error: err })
  }
}

export const editUserAttribute = (
  attribute: UserAttribute
): ThunkAction<void, RespliceState, null, UserActions> => async dispatch => {
  dispatch({ type: EDIT_USER_ATTRIBUTE, loading: true })
  try {
    const response = await api.put(
      `/user/attributes/${attribute.attribute_uuid}/edit`,
      attribute
    )
    const editedAttribute: UserAttribute = response.data
    dispatch({
      type: EDIT_USER_ATTRIBUTE,
      payload: editedAttribute
    })
  } catch (err) {
    dispatch({ type: EDIT_USER_ATTRIBUTE, error: err })
  }
}

export const verifyUserAttribute = (
  uuid: string,
  code: string
): ThunkAction<void, RespliceState, null, UserActions> => async dispatch => {
  dispatch({ type: VERIFY_USER_ATTRIBUTE, loading: true })
  try {
    const response = await api.patch(`/user/attributes/${uuid}/verify`, {
      verify_token: code
    })
    const verifiedAttribute: UserAttribute = response.data
    dispatch({
      type: VERIFY_USER_ATTRIBUTE,
      payload: verifiedAttribute
    })
  } catch (err) {
    dispatch({ type: VERIFY_USER_ATTRIBUTE, error: err })
  }
}

export const toggleQrSharable = (
  uuid: string,
  sharable: boolean
): ThunkAction<void, RespliceState, null, UserActions> => async dispatch => {
  dispatch({ type: TOGGLE_QR_SHARABLE, loading: true })
  try {
    const response = await api.patch(
      `/user/attributes/${uuid}/set_qr_sharable`,
      { qr_sharable: sharable }
    )
    const sharableAttribute: UserAttribute = response.data
    dispatch({
      type: TOGGLE_QR_SHARABLE,
      payload: sharableAttribute
    })
  } catch (err) {
    dispatch({ type: TOGGLE_QR_SHARABLE, error: err })
  }
}

export const deleteUserAttribute = (
  uuid: string
): ThunkAction<void, RespliceState, null, UserActions> => async dispatch => {
  dispatch({ type: DELETE_USER_ATTRIBUTE, loading: true })
  try {
    await api.delete(`/user/attributes/${uuid}/set_qr_sharable`)
    dispatch({
      type: DELETE_USER_ATTRIBUTE,
      payload: uuid
    })
  } catch (err) {
    dispatch({ type: DELETE_USER_ATTRIBUTE, error: err })
  }
}
