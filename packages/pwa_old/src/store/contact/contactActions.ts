import { RespliceState } from '../store'
import {
  Contact,
  ContactRecord,
  ContactCollection,
  ContactAttribute,
  ContactShare,
  ContactActions,
  FETCH_CONTACTS,
  FETCH_CONTACT,
  INVITE_CONTACT,
  SET_CONTACT_INFO,
  ADD_CONTACT_TAG,
  UNLOCK_CONTACT,
  REMOVE_CONTACT_TAG,
  DELETE_CONTACT,
  FETCH_CONTACTS_ATTRIBUTES,
  FETCH_CONTACT_ATTRIBUTES,
  FETCH_CONTACT_ATTRIBUTE,
  DELETE_PENDING_ATTRIBUTES,
  FETCH_CONTACTS_SHARES,
  FETCH_CONTACT_SHARES,
  FETCH_CONTACT_SHARE,
  ADD_CONTACT_SHARE,
  SET_CONTACT_SHARE_EXPIRY,
  DELETE_CONTACT_SHARE
} from './types'
import { ThunkAction } from 'redux-thunk'
import api from '../../api'

import { toDictionary } from '../../helpers'

export const fetchContacts = (): ThunkAction<
  Promise<void>,
  RespliceState,
  null,
  ContactActions
> => async dispatch => {
  dispatch({ type: FETCH_CONTACTS, loading: true })
  try {
    const response = await api.get('/contacts/get')
    const contacts: Contact[] = response.data.contacts
    const contactRecords: Dictionary<ContactRecord> = toDictionary(
      'uuid',
      contacts
    )
    dispatch({
      type: FETCH_CONTACTS,
      payload: contactRecords
    })
  } catch (err) {
    dispatch({ type: FETCH_CONTACTS, error: err })
  }
}

export const fetchContact = (
  uuid: string
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: FETCH_CONTACT, loading: true })
  try {
    const response = await api.get(`/contacts/${uuid}/get`)
    const contactCollection: ContactCollection = response.data
    const contactRecord: ContactRecord = {
      ...contactCollection.contact,
      attributes: toDictionary('uuid', contactCollection.contact_attributes),
      shares: toDictionary('uuid', contactCollection.contact_shares)
    }
    dispatch({
      type: FETCH_CONTACT,
      payload: contactRecord
    })
  } catch (err) {
    dispatch({ type: FETCH_CONTACT, error: err })
  }
}

export const inviteContact = (invite: {
  type: 'phone' | 'email'
  value: string
}): ThunkAction<
  void,
  RespliceState,
  null,
  ContactActions
> => async dispatch => {
  dispatch({ type: INVITE_CONTACT, loading: true })
  try {
    const response = await api.post('/contacts/invite', invite)
    const contactCollection: ContactCollection = response.data
    const contactRecord: ContactRecord = {
      ...contactCollection.contact,
      attributes: toDictionary('uuid', contactCollection.contact_attributes),
      shares: toDictionary('uuid', contactCollection.contact_shares)
    }
    dispatch({
      type: INVITE_CONTACT,
      payload: contactRecord
    })
  } catch (err) {
    dispatch({ type: INVITE_CONTACT, error: err })
  }
}

export const unlockContact = (
  uuid: string,
  pin: string
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: UNLOCK_CONTACT, loading: true })
  try {
    const response = await api.post(`/contacts/${uuid}/unlock`, {
      unlock_pin: pin
    })
    const contactCollection: ContactCollection = response.data
    const contactRecord: ContactRecord = {
      ...contactCollection.contact,
      attributes: toDictionary('uuid', contactCollection.contact_attributes),
      shares: toDictionary('uuid', contactCollection.contact_shares)
    }
    dispatch({
      type: UNLOCK_CONTACT,
      payload: contactRecord
    })
  } catch (err) {
    dispatch({ type: UNLOCK_CONTACT, error: err })
  }
}

export const setContactInfo = (
  uuid: string,
  info: { nickname: string; description: string }
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: SET_CONTACT_INFO, loading: true })
  try {
    const response = await api.patch(`/contacts/${uuid}/set_info`, info)
    const contact: Contact = response.data
    dispatch({
      type: SET_CONTACT_INFO,
      payload: contact
    })
  } catch (err) {
    dispatch({ type: SET_CONTACT_INFO, error: err })
  }
}

export const addContactTag = (
  uuid: string,
  tag: string
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: ADD_CONTACT_TAG, loading: true })
  try {
    const response = await api.patch(`/contacts/${uuid}/add_tag`, { tag })
    const contact: Contact = response.data
    dispatch({
      type: ADD_CONTACT_TAG,
      payload: contact
    })
  } catch (err) {
    dispatch({ type: ADD_CONTACT_TAG, error: err })
  }
}

export const removeContactTag = (
  uuid: string,
  tag: string
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: REMOVE_CONTACT_TAG, loading: true })
  try {
    const response = await api.patch(`/contacts/${uuid}/remove_tag`, { tag })
    const contact: Contact = response.data
    dispatch({
      type: REMOVE_CONTACT_TAG,
      payload: contact
    })
  } catch (err) {
    dispatch({ type: REMOVE_CONTACT_TAG, error: err })
  }
}

export const deleteContact = (
  uuid: string
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: DELETE_CONTACT, loading: true })
  try {
    await api.delete(`/contacts/${uuid}/delete`)
    dispatch({
      type: DELETE_CONTACT,
      payload: uuid
    })
  } catch (err) {
    dispatch({ type: DELETE_CONTACT, error: err })
  }
}

export const fetchContactsAttributes = (): ThunkAction<
  void,
  RespliceState,
  null,
  ContactActions
> => async dispatch => {
  dispatch({ type: FETCH_CONTACTS_ATTRIBUTES, loading: true })
  try {
    const response = await api.get('/contacts/attributes/get')
    const attributes: ContactAttribute[] = response.data
    const attributesDictionary: Dictionary<ContactAttribute> = toDictionary(
      'attribute_uuid',
      attributes
    )
    dispatch({
      type: FETCH_CONTACTS_ATTRIBUTES,
      payload: attributesDictionary
    })
  } catch (err) {
    dispatch({ type: FETCH_CONTACTS_ATTRIBUTES, error: err })
  }
}

export const fetchContactAttributes = (
  uuid: string
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: FETCH_CONTACT_ATTRIBUTES, loading: true })
  try {
    const response = await api.get(`/contacts/${uuid}/attributes/get`)
    const attributes: ContactAttribute[] = response.data
    const attributesDictionary: Dictionary<ContactAttribute> = toDictionary(
      'attribute_uuid',
      attributes
    )
    dispatch({
      type: FETCH_CONTACT_ATTRIBUTES,
      payload: { uuid, attributes: attributesDictionary }
    })
  } catch (err) {
    dispatch({ type: FETCH_CONTACT_ATTRIBUTES, error: err })
  }
}

export const fetchContactAttribute = (
  uuid: string,
  attribute_uuid: string
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: FETCH_CONTACT_ATTRIBUTE, loading: true })
  try {
    const response = await api.get(
      `/contacts/${uuid}/attributes/${attribute_uuid}/get`
    )
    const attribute: ContactAttribute = response.data
    dispatch({
      type: FETCH_CONTACT_ATTRIBUTE,
      payload: { uuid, attribute: attribute }
    })
  } catch (err) {
    dispatch({ type: FETCH_CONTACT_ATTRIBUTE, error: err })
  }
}

export const deletePendingAttributes = (
  uuid: string
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: DELETE_PENDING_ATTRIBUTES, loading: true })
  try {
    await api.delete(`/contacts/${uuid}/attributes/delete_pending`)
    dispatch({
      type: DELETE_PENDING_ATTRIBUTES,
      payload: uuid
    })
  } catch (err) {
    dispatch({ type: DELETE_PENDING_ATTRIBUTES, error: err })
  }
}

export const fetchContactsShares = (): ThunkAction<
  void,
  RespliceState,
  null,
  ContactActions
> => async dispatch => {
  dispatch({ type: FETCH_CONTACTS_SHARES, loading: true })
  try {
    const response = await api.get('/contacts/shares/get')
    const shares: ContactShare[] = response.data
    dispatch({
      type: FETCH_CONTACTS_SHARES,
      payload: shares
    })
  } catch (err) {
    dispatch({ type: FETCH_CONTACTS_SHARES, error: err })
  }
}

export const fetchContactShares = (
  uuid: string
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: FETCH_CONTACT_SHARES, loading: true })
  try {
    const response = await api.get(`/contacts/${uuid}/shares/get`)
    const shares: ContactShare[] = response.data
    dispatch({
      type: FETCH_CONTACT_SHARES,
      payload: shares
    })
  } catch (err) {
    dispatch({ type: FETCH_CONTACT_SHARES, error: err })
  }
}

export const fetchContactShare = (
  uuid: string,
  attribute_uuid: string
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: FETCH_CONTACT_SHARE, loading: true })
  try {
    const response = await api.get(
      `/contacts/${uuid}/shares/${attribute_uuid}/get`
    )
    const share: ContactShare = response.data
    dispatch({
      type: FETCH_CONTACT_SHARE,
      payload: share
    })
  } catch (err) {
    dispatch({ type: FETCH_CONTACT_SHARE, error: err })
  }
}

export const addContactShare = (
  uuid: string,
  attribute_uuid: string
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: ADD_CONTACT_SHARE, loading: true })
  try {
    const response = await api.post(
      `/contacts/${uuid}/shares/${attribute_uuid}/add`
    )
    const share: ContactShare = response.data
    dispatch({
      type: ADD_CONTACT_SHARE,
      payload: share
    })
  } catch (err) {
    dispatch({ type: ADD_CONTACT_SHARE, error: err })
  }
}

export const setContactShareExpiry = (
  uuid: string,
  attribute_uuid: string,
  expiry: string
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: SET_CONTACT_SHARE_EXPIRY, loading: true })
  try {
    const response = await api.patch(
      `/contacts/${uuid}/shares/${attribute_uuid}/set_expiry`,
      { expiry }
    )
    const share: ContactShare = response.data
    dispatch({
      type: SET_CONTACT_SHARE_EXPIRY,
      payload: share
    })
  } catch (err) {
    dispatch({ type: SET_CONTACT_SHARE_EXPIRY, error: err })
  }
}

export const deleteContactShare = (
  uuid: string,
  attribute_uuid: string
): ThunkAction<void, RespliceState, null, ContactActions> => async dispatch => {
  dispatch({ type: DELETE_CONTACT_SHARE, loading: true })
  try {
    await api.delete(`/contacts/${uuid}/shares/${attribute_uuid}/delete`)
    dispatch({
      type: DELETE_CONTACT_SHARE,
      payload: { uuid, attribute_uuid }
    })
  } catch (err) {
    dispatch({ type: DELETE_CONTACT_SHARE, error: err })
  }
}
