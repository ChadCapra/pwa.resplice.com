import { RespliceState } from '../store'
import {
  IUserProfile,
  IUserAttribute,
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

type UserThunk = ThunkAction<Promise<void>, RespliceState, null, UserActions>

export const fetchUserProfile = (): UserThunk => async dispatch => {
  dispatch({ type: FETCH_USER_PROFILE, loading: true })
  try {
    const response = await api.get('/user/profile')
    const profile: IUserProfile = response.data.user
    dispatch({
      type: FETCH_USER_PROFILE,
      payload: profile
    })
  } catch (err) {
    dispatch({ type: FETCH_USER_PROFILE, error: err })
    throw err
  }
}

export const editUserName = (name: string): UserThunk => async dispatch => {
  dispatch({ type: EDIT_USER_NAME, loading: true })
  try {
    const response = await api.patch('/user/edit_name', name)
    const profile: IUserProfile = response.data
    dispatch({
      type: EDIT_USER_NAME,
      payload: profile
    })
  } catch (err) {
    dispatch({ type: EDIT_USER_NAME, error: err })
  }
}

export const editUserAvatar = (avatar: File): UserThunk => async dispatch => {
  dispatch({ type: EDIT_USER_AVATAR, loading: true })
  try {
    const response = await api.patch('/user/edit_avatar')
    const profile: IUserProfile = response.data
    dispatch({
      type: EDIT_USER_AVATAR,
      payload: profile
    })
  } catch (err) {
    dispatch({ type: EDIT_USER_AVATAR, error: err })
  }
}

export const deleteUser = (): UserThunk => async dispatch => {
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

export const fetchUserAttributes = (): UserThunk => async dispatch => {
  dispatch({ type: FETCH_USER_ATTRIBUTES, loading: true })
  try {
    const response = await api.get('/user/attributes/get')
    const attributes: IUserAttribute[] = response.data.user_attributes
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
): UserThunk => async dispatch => {
  dispatch({ type: FETCH_USER_ATTRIBUTE, loading: true })
  try {
    const response = await api.get(`/user/attributes/${uuid}/get`)
    const attribute: IUserAttribute = response.data[0]
    dispatch({
      type: FETCH_USER_ATTRIBUTE,
      payload: attribute
    })
  } catch (err) {
    dispatch({ type: FETCH_USER_ATTRIBUTE, error: err })
  }
}

export const addUserAttribute = (
  attribute: IUserAttribute
): UserThunk => async dispatch => {
  dispatch({ type: ADD_USER_ATTRIBUTE, loading: true })
  try {
    const response = await api.post('/user/attributes/add', attribute)
    const newAttribute: IUserAttribute = response.data
    dispatch({
      type: ADD_USER_ATTRIBUTE,
      payload: newAttribute
    })
  } catch (err) {
    dispatch({ type: ADD_USER_ATTRIBUTE, error: err })
  }
}

export const editUserAttribute = ({
  uuid,
  collection,
  name,
  value
}: IUserAttribute): UserThunk => async dispatch => {
  dispatch({ type: EDIT_USER_ATTRIBUTE, loading: true })
  try {
    const response = await api.put(`/user/attributes/${uuid}/edit`, {
      collection,
      name,
      value
    })
    const editedAttribute: IUserAttribute = response.data
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
): UserThunk => async dispatch => {
  dispatch({ type: VERIFY_USER_ATTRIBUTE, loading: true })
  try {
    const response = await api.patch(`/user/attributes/${uuid}/verify`, {
      verify_token: code
    })
    const verifiedAttribute: IUserAttribute = response.data
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
): UserThunk => async dispatch => {
  dispatch({ type: TOGGLE_QR_SHARABLE, loading: true })
  try {
    const response = await api.patch(
      `/user/attributes/${uuid}/set_qr_sharable`,
      { qr_sharable: sharable }
    )
    const sharableAttribute: IUserAttribute = response.data
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
): UserThunk => async dispatch => {
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
