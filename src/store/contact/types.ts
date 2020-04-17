export interface ContactState {
  loading: boolean
  error: Dictionary<any> | null
  contacts: Dictionary<Contact> | null
  contacts_loaded_at: Date | null
}
export interface ContactCollection {
  contact: Contact
  contact_attributes: ContactAttribute[]
  contact_shares: ContactShare[]
}
export interface Contact {
  uuid: string
  name: string
  avatar: string
  tags: string[]
  description: string
  pending_expiration: string | null
  attributes_updated_at: string
  shares_updated_at: string
  attributes?: Dictionary<ContactAttribute>
  shares?: Dictionary<ContactShare>
}

export interface ContactAttribute {
  contact_uuid: string
  uuid: string
  attribute_type_id: number
  collection: string
  name: string
  value: Dictionary<string>
  pending_attribute_value: Dictionary<string>
  is_verified: boolean
  shared_at: string
}
export interface ContactShare {
  contact_uuid: string
  attribute_uuid: string
  expiry: string
}

export const FETCH_CONTACTS = 'FETCH_CONTACTS'
export const FETCH_CONTACT = 'FETCH_CONTACT'
export const INVITE_CONTACT = 'INVITE_CONTACT'
export const UNLOCK_CONTACT = 'UNLOCK_CONTACT'
export const SET_CONTACT_INFO = 'SET_CONTACT_INFO'
export const ADD_CONTACT_TAG = 'ADD_CONTACT_TAG'
export const REMOVE_CONTACT_TAG = 'REMOVE_CONTACT_TAG'
export const DELETE_CONTACT = 'DELETE_CONTACT'

export const FETCH_CONTACTS_ATTRIBUTES = 'FETCH_CONTACTS_ATTRIBUTES'
export const FETCH_CONTACT_ATTRIBUTES = 'FETCH_CONTACT_ATTRIBUTES'
export const FETCH_CONTACT_ATTRIBUTE = 'FETCH_CONTACT_ATTRIBUTE'
export const DELETE_PENDING_ATTRIBUTES = 'DELETE_PENDING_ATTRIBUTES'

export const FETCH_CONTACTS_SHARES = 'FETCH_CONTACTS_SHARES'
export const FETCH_CONTACT_SHARES = 'FETCH_CONTACT_SHARES'
export const FETCH_CONTACT_SHARE = 'FETCH_CONTACT_SHARE'
export const ADD_CONTACT_SHARE = 'ADD_CONTACT_SHARE'
export const SET_CONTACT_SHARE_EXPIRY = 'SET_CONTACT_SHARE_EXPIRY'
export const DELETE_CONTACT_SHARE = 'DELETE_CONTACT_SHARE'

interface FetchContactsAction {
  type: typeof FETCH_CONTACTS
  payload?: Dictionary<Contact>
  loading?: boolean
  error?: Dictionary<any> | null
}

interface FetchContactAction {
  type: typeof FETCH_CONTACT
  payload?: Contact
  loading?: boolean
  error?: Dictionary<any> | null
}

interface InviteContactAction {
  type: typeof INVITE_CONTACT
  payload?: Contact
  loading?: boolean
  error?: Dictionary<any> | null
}

interface UnlockContactAction {
  type: typeof UNLOCK_CONTACT
  payload?: Contact
  loading?: boolean
  error?: Dictionary<any> | null
}

interface SetContactInfoAction {
  type: typeof SET_CONTACT_INFO
  payload?: Contact
  loading?: boolean
  error?: Dictionary<any> | null
}

interface AddContactTagAction {
  type: typeof ADD_CONTACT_TAG
  payload?: Contact
  loading?: boolean
  error?: Dictionary<any> | null
}

interface RemoveContactTagAction {
  type: typeof REMOVE_CONTACT_TAG
  payload?: Contact
  loading?: boolean
  error?: Dictionary<any> | null
}

interface DeleteContactAction {
  type: typeof DELETE_CONTACT
  payload?: string
  loading?: boolean
  error?: Dictionary<any> | null
}

interface FetchContactsAttributesAction {
  type: typeof FETCH_CONTACTS_ATTRIBUTES
  payload?: Dictionary<ContactAttribute>
  loading?: boolean
  error?: Dictionary<any> | null
}

interface FetchContactAttributesAction {
  type: typeof FETCH_CONTACT_ATTRIBUTES
  payload?: { uuid: string; attributes: Dictionary<ContactAttribute> }
  loading?: boolean
  error?: Dictionary<any> | null
}

interface FetchContactAttributeAction {
  type: typeof FETCH_CONTACT_ATTRIBUTE
  payload?: { uuid: string; attribute: ContactAttribute }
  loading?: boolean
  error?: Dictionary<any> | null
}

interface DeletePendingAttributesAction {
  type: typeof DELETE_PENDING_ATTRIBUTES
  payload?: string
  loading?: boolean
  error?: Dictionary<any> | null
}

interface FetchContactsSharesAction {
  type: typeof FETCH_CONTACTS_SHARES
  payload?: ContactShare[]
  loading?: boolean
  error?: Dictionary<any> | null
}

interface FetchContactSharesAction {
  type: typeof FETCH_CONTACT_SHARES
  payload?: ContactShare[]
  loading?: boolean
  error?: Dictionary<any> | null
}

interface FetchContactShareAction {
  type: typeof FETCH_CONTACT_SHARE
  payload?: ContactShare
  loading?: boolean
  error?: Dictionary<any> | null
}

interface AddContactShareAction {
  type: typeof ADD_CONTACT_SHARE
  payload?: ContactShare
  loading?: boolean
  error?: Dictionary<any> | null
}

interface SetContactShareExpiryAction {
  type: typeof SET_CONTACT_SHARE_EXPIRY
  payload?: ContactShare
  loading?: boolean
  error?: Dictionary<any> | null
}

interface DeleteContactShareAction {
  type: typeof DELETE_CONTACT_SHARE
  payload?: { uuid: string; attribute_uuid: string }
  loading?: boolean
  error?: Dictionary<any> | null
}

export type ContactActions =
  | FetchContactsAction
  | FetchContactAction
  | InviteContactAction
  | UnlockContactAction
  | SetContactInfoAction
  | AddContactTagAction
  | RemoveContactTagAction
  | DeleteContactAction
  | FetchContactsAttributesAction
  | FetchContactAttributesAction
  | FetchContactAttributeAction
  | DeletePendingAttributesAction
  | FetchContactsSharesAction
  | FetchContactSharesAction
  | FetchContactShareAction
  | AddContactShareAction
  | SetContactShareExpiryAction
  | DeleteContactShareAction
