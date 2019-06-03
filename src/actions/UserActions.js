import api from '../api'
import {
  AUTHORIZE,
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPLOAD_AVATAR,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAILURE
} from './types'

export const fetchUserProfile = () => async dispatch => {
  dispatch({ type: FETCH_PROFILE })

  try {
    const response = await api.get('/user/profile')
    if (response.data.data.name) {
      dispatch({ type: AUTHORIZE })
    }
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: response.data })
  } catch (err) {
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
