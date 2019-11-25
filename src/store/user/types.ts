export interface UserState {
  loading: boolean
  error: Dictionary<any> | null
  profile: UserProfile | null
  attributes: Dictionary<UserAttribute> | null
  attributes_loaded_at: Date | null
}
export interface UserProfile {
  uuid: string
  name: string
  avatar: string
  locale: string
  tags: Dictionary<string>
  unlock_pin: string
  unlock_pin_expiry: string
  user_registered_at: string
  share_count: number
  attribute_count: number
  location_enabled: boolean
  notification_value_uuid: string
}
export interface UserAttribute {
  uuid: string
  attribute_type_id: number
  name: string
  collection: string
  value_uuid: string
  value: Dictionary<string>
  verified_at: string
  latest_to_verify: boolean
  verify_token: number | null
  verify_expiry: string | null
  qr_shareable: boolean
  expiry: string | null
}

export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE'
export const EDIT_USER_NAME = 'EDIT_USER_NAME'
export const EDIT_USER_AVATAR = 'EDIT_USER_AVATAR'
export const DELETE_USER = 'DELETE_USER'

export const FETCH_USER_ATTRIBUTES = 'FETCH_USER_ATTRIBUTES'
export const FETCH_USER_ATTRIBUTE = 'FETCH_USER_ATTRIBUTE'
export const ADD_USER_ATTRIBUTE = 'ADD_USER_ATTRIBUTE'
export const EDIT_USER_ATTRIBUTE = 'EDIT_USER_ATTRIBUTE'
export const VERIFY_USER_ATTRIBUTE = 'VERIFY_USER_ATTRIBUTE'
export const TOGGLE_QR_SHARABLE = 'TOGGLE_QR_SHARABLE'
export const DELETE_USER_ATTRIBUTE = 'DELETE_USER_ATTRIBUTE'

interface FetchUserProfileAction {
  type: typeof FETCH_USER_PROFILE
  payload?: UserProfile
  loading?: boolean
  error?: Dictionary<any> | null
}

interface EditUserNameAction {
  type: typeof EDIT_USER_NAME
  payload?: UserProfile
  loading?: boolean
  error?: Dictionary<any> | null
}

interface EditUserAvatarAction {
  type: typeof EDIT_USER_AVATAR
  payload?: UserProfile
  loading?: boolean
  error?: Dictionary<any> | null
}

interface DeleteUserAction {
  type: typeof DELETE_USER
  loading?: boolean
  error?: Dictionary<any> | null
}

interface FetchUserAttributesAction {
  type: typeof FETCH_USER_ATTRIBUTES
  payload?: UserAttribute[]
  loading?: boolean
  error?: Dictionary<any> | null
}

interface FetchUserAttributeAction {
  type: typeof FETCH_USER_ATTRIBUTE
  payload?: UserAttribute
  loading?: boolean
  error?: Dictionary<any> | null
}

interface AddUserAttributeAction {
  type: typeof ADD_USER_ATTRIBUTE
  payload?: UserAttribute
  loading?: boolean
  error?: Dictionary<any> | null
}

interface EditUserAttributeAction {
  type: typeof EDIT_USER_ATTRIBUTE
  payload?: UserAttribute
  loading?: boolean
  error?: Dictionary<any> | null
}

interface VerifyUserAttributeAction {
  type: typeof VERIFY_USER_ATTRIBUTE
  payload?: UserAttribute
  loading?: boolean
  error?: Dictionary<any> | null
}

interface ToggleQrSharableAction {
  type: typeof TOGGLE_QR_SHARABLE
  payload?: UserAttribute
  loading?: boolean
  error?: Dictionary<any> | null
}

interface DeleteUserAttributeAction {
  type: typeof DELETE_USER_ATTRIBUTE
  payload?: string
  loading?: boolean
  error?: Dictionary<any> | null
}

export type UserActions =
  | FetchUserProfileAction
  | EditUserNameAction
  | EditUserAvatarAction
  | DeleteUserAction
  | FetchUserAttributesAction
  | FetchUserAttributeAction
  | AddUserAttributeAction
  | EditUserAttributeAction
  | VerifyUserAttributeAction
  | ToggleQrSharableAction
  | DeleteUserAttributeAction
