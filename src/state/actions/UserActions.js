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
    const {
      ok: { attributes, ...profile },
      requested_at
    } = response.data
    const attributesDict = objectArrToDict(attributes, 'uuid')
    if (profile.name) {
      dispatch({ type: AUTHORIZE })
    }
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: { attributes: attributesDict, profile, requested_at }
    })
  } catch (err) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: err })
  }
}

export const completeProfile = formValues => async dispatch => {
  dispatch({ type: CREATE_PROFILE })

  try {
    const response = await api.post('/user/complete_profile', formValues)
    const {
      ok: { attributes, ...profile },
      requested_at
    } = response.data
    dispatch({
      type: CREATE_PROFILE_SUCCESS,
      payload: { attributes, profile, requested_at }
    })
    dispatch({ type: AUTHORIZE })
  } catch (err) {
    console.log(err)
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

export const editAvatar = blob => async (dispatch, getState) => {
  dispatch({ type: EDIT_AVATAR })

  try {
    const { uuid } = getState().userState.profile
    const avatar = new File([blob], `avatar_${uuid}.png`)
    const response = await api.patch('/user/edit_avatar', avatar)
    dispatch({ type: EDIT_AVATAR_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: EDIT_AVATAR_FAILURE, payload: err })
  }
}
