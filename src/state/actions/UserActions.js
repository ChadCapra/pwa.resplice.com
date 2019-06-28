import api from '../../api'
import {
  AUTHORIZE,
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPLOAD_AVATAR,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAILURE,
  CREATE_PROFILE,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
  UPDATE_NAME,
  UPDATE_NAME_SUCCESS,
  UPDATE_NAME_FAILURE
} from './types'

import { objectArrToDict } from '../../helpers'

export const fetchUserProfile = () => async (dispatch, getState) => {
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

export const uploadAvatar = blob => async dispatch => {
  dispatch({ type: UPLOAD_AVATAR })

  try {
    let formData = new FormData()
    formData.append('avatar', blob)
    console.log(blob, formData)
    // const response = await api.post('/user/upload-avatar', {
    //   avatar: formData
    // })
    dispatch({ type: UPLOAD_AVATAR_SUCCESS, payload: 'implement' })
  } catch (err) {
    dispatch({ type: UPLOAD_AVATAR_FAILURE, payload: err })
  }
}

export const createProfile = formValues => async dispatch => {
  dispatch({ type: CREATE_PROFILE })

  try {
    const response = await api.post('/user/create_profile', formValues)
    dispatch({ type: CREATE_PROFILE_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: CREATE_PROFILE_FAILURE, payload: err.response })
  }
}

export const updateName = (name, oldName) => async dispatch => {
  dispatch({ type: UPDATE_NAME, payload: name })

  try {
    await api.patch('/user/name', name)
    dispatch({ type: UPDATE_NAME_SUCCESS })
  } catch (err) {
    dispatch({ type: UPDATE_NAME_FAILURE, payload: { err, oldName } })
  }
}
