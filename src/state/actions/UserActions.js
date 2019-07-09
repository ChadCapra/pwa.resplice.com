import api from '../../api'
import {
  AUTHORIZE,
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  EDIT_AVATAR,
  EDIT_AVATAR_SUCCESS,
  EDIT_AVATAR_FAILURE,
  CREATE_PROFILE,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
  EDIT_NAME,
  EDIT_NAME_SUCCESS,
  EDIT_NAME_FAILURE
} from './types'

import { objectArrToDict } from '../../helpers'

export const fetchUserProfile = () => async dispatch => {
  dispatch({ type: FETCH_PROFILE })

  try {
    const response = await api.get('/user/profile')
    response.data.ok.attributes = objectArrToDict(
      response.data.ok.attributes,
      'uuid'
    )
    if (response.data.ok.name) {
      dispatch({ type: AUTHORIZE })
    }
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: response.data
    })
  } catch (err) {
    console.log(err)
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: err })
  }
}

export const createProfile = formValues => async dispatch => {
  dispatch({ type: CREATE_PROFILE })

  try {
    const response = await api.post('/user/complete_profile', formValues)
    dispatch({ type: CREATE_PROFILE_SUCCESS, payload: response.data })
    dispatch({ type: AUTHORIZE })
  } catch (err) {
    dispatch({ type: CREATE_PROFILE_FAILURE, payload: err.response })
  }
}

export const editName = name => async dispatch => {
  dispatch({ type: EDIT_NAME, payload: name })

  try {
    await api.patch('/user/name', name)
    dispatch({ type: EDIT_NAME_SUCCESS })
  } catch (err) {
    dispatch({ type: EDIT_NAME_FAILURE, payload: err })
  }
}

export const editAvatar = blob => async dispatch => {
  dispatch({ type: EDIT_AVATAR })

  try {
    let formData = new FormData()
    formData.append('avatar', blob)
    console.log(blob, formData)
    const response = await api.patch('/user/upload-avatar', {
      avatar: formData
    })
    dispatch({ type: EDIT_AVATAR_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: EDIT_AVATAR_FAILURE, payload: err })
  }
}
