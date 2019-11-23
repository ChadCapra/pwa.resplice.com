/// <reference types="react-scripts" />

// Utility Types
type Dictionary = {
  [index: string]: any
}

type ObjectDictionary = {
  [index: string]: object
}

type Match = {
  path: string
}

type Callback = (...args: any[]) => void
// End Utility Types

// Shared Types
type AsyncAction = (...args: any[]) => Promise<void>
type Action = (...args: any[]) => { type: string; payload?: any }
interface StateSlice {
  loading: boolean
  error: ErrorObj | null
}
type ErrorType = 'unauthorized' | 'network' | 'server' | 'generic'
type ErrorObj = {
  type: ErrorType
  name: string
  message: string
  timestamp: Date
  raw: Error
}

interface RespliceState {
  utilState: UtilState
  authState: AuthState
  userState: UserState
  contactState: ContactState
  groupState: GroupState
}

// UtilState
interface UtilState extends StateSlice {
  offline: boolean
  globalLoading: boolean
  swipeIndex: number
  attribute_types: AttributeType[]
}
interface AttributeType {
  id: number
  sort_order: int
  name: string
  verify_seconds: string
  preview_name: string
  empty_value: { [index: string]: string }
  actions: AttributeAction[]
}
interface AttributeAction {
  sort_order: number
  name: string
  display_name: string
  icon: string
  user_only: boolean
  unverified_only: boolean
  action_value: string
}
// End UtilState

// AuthState
interface AuthState extends StateSlice {
  access_token: string
  session: Session | null
  lastLocation: Position | null
  loginValues: LoginValues
}
type LoginValues = {
  phone: string
  email: string
}
type Session = {
  uuid: string
  user_uuid: string
  user_agent: string
  authenticated_at: string
  authorized_at: string
  phone_verified_at: string
  phone_verified_token: string
  email_verified_at: string
  email_verified_token: string
  failed_verifications: number
  location_enabled: boolean
  profile_completed_at: boolean
  expiry: string
}
interface CreateProfileValues {
  name: string
  date_of_birth: string
  country: string
  street_address_1: string
  street_address_2: string
  locality: string
  region: string
  postal_code: string
}
// End AuthState

// UserState
interface UserState extends StateSlice {
  profile: UserProfile | null
  attributes: { [index: string]: UserAttribute } | null
  attributes_loaded_at: Date | null
}
interface UserProfile {
  uuid: string
  name: string
  avatar: string
  tags: { [index: string]: string }
  unlock_pin: string
  unlock_pin_expiry: string
  registered_at: string
  share_count: number
  attribute_count: number
  location_enabled: boolean
  notification_value_uuid: string
}
interface UserAttribute {
  uuid: string
  attribute_type_id: number
  name: string
  collection: string
  value_uuid: string
  value: { [index: string]: string }
  verified_at: string
  latest_to_verify: boolean
  verify_expiry: string | null
  expiry: string | null
  qr_shareable: boolean
  verify_token: number | null
}
// End UserState

// ContactState
interface ContactState extends StateSlice {
  contacts: Contacts | null
  contacts_loaded_at: Date | null
}
interface Contacts {
  [index: string]: Contact
}
interface Contact {
  uuid: string
  name: string
  avatar: string | null
  tags: string[]
  description
  pending_expiration: string | null
  attributes_updated_at: string
  shares_updated_at: string
  attributes: { [index: string]: ContactAttribute }
  shares: { [index: string]: ContactShare }
}
interface ContactAttribute {
  contact_uuid: string
  attribute_uuid: string
  attribute_type_id: number
  collection: string
  name: string
  value: { [index: string]: string }
  pending_attribute_value: { [index: string]: string }
  is_verified: boolean
  shared_at: string
}
interface ContactShare {
  contact_uuid: string
  attribute_uuid: string
  expiry: string
}
// End ContactState

// GroupState
interface GroupState extends StateSlice {
  groups: Groups | null
  groups_loaded_at: string
}
interface Groups {
  [index: string]: Group
}
interface Group {
  uuid: string
  name: string
  avatar: string | null
  joined_at: string
  member_count: number
  member_uuids: string[]
  pending_attribute_value: { [index: string]: string }
  requested_at: string
  members: { [index: string]: GroupMember }
  attributes: { [index: string]: GroupAttribute }
  shares: { [index: string]: GroupShare }
}
interface GroupMember {
  group_uuid: string
  contact_uuid: string
  name: string
}
interface GroupAttribute {
  group_uuid: string
  attribute_uuid: string
  attribute_type_id: number
  collection: string
  name: string
  value: { [index: string]: string }
}
interface GroupShare {
  group_uuid: string
  attribute_uuid: string
  expiry: string
}
// End GroupState
