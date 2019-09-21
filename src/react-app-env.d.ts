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

// Redux State Types
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
  authState: AuthState
  userState: UserState
  contactState: ContactState
  groupState: GroupState
  attributeState: AttributeState
  shareState: ShareState
  utilState: UtilState
}

// AuthState
interface AuthState extends StateSlice {
  isAuthorized: boolean
  session: Session | null
  loginValues: LoginValues | null
}
type Session = {
  uuid: string
  user_agent: string
  access_token: string
  phone_verified_at: string
  email_verified_at: string
  authorized_at: string
  user_uuid: string
  profile_complete: boolean
  expiry: string
}
type LoginValues = {
  phone: string
  email: string
}
type Verification = {
  token_1_valid: boolean
  token_2_valid: boolean
}
interface VerifiedVerification {
  user_uuid: string
  access_token: string
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
  collections: { [index: string]: UserAttribute[] } | null
  types: { [index: number]: AttributeType } | null
  settings: Settings | null
  requested_at: string | null
}
interface UserProfile {
  uuid: string
  name: string
  avatar: string
  profile_complete: boolean
  registered_at: string
  unique_contacts: number
  total_shares: number
}
interface Settings {}
interface UserAttribute {
  uuid: string
  attribute_type_id: number
  collection: string
  name: string
  value: { [index: string]: string }
  verified_recency: number
  qr_shareable: boolean
  expiry: string | null
  created_at: string
  updated_at: string
  verify_token: number | null
  actions: AttributeAction[]
}
// End UserState

// ContactState
interface ContactState extends StateSlice {
  contacts: Contacts | null
  types: { [index: number]: AttributeType } | null
  requested_at: string | null
}
interface Contacts {
  [index: string]: ContactSummary | ContactDetails
}
interface ContactSummary {
  uuid: string
  name: string
  avatar: string | null
  tags: string[]
  pending_expiration: string | null
  searchable_values: string[]
}
interface ContactDetails extends ContactSummary {
  attributes: ContactAttribute[]
  shares: ContactShare[]
}
interface ContactAttribute {
  uuid: string
  attribute_type_id: number
  collection: string
  name: string
  value: { [index: string]: string }
  pending_attribute_value: { [index: string]: string }
  is_verified: boolean
  shared_at: string
}
interface ContactShare {
  attribute_uuid: string
  expiry: string
}
// End ContactState

// GroupState
interface GroupState extends StateSlice {
  groups: Groups | null
  types: { [index: number]: AttributeType } | null
}
interface Groups {
  [index: string]: GroupSummary | GroupDetails
}
interface GroupSummary {
  uuid: string
  name: string
  avatar: string | null
  joined_at: string
  member_count: number
  member_uuids: string[]
  pending_attribute_value: { [index: string]: string }
  requested_at: string
}
interface GroupDetails extends GroupSummary {
  attributes: GroupAttribute[]
  shares: GroupShare[]
}
interface GroupAttribute {
  uuid: string
  attribute_type_id: number
  collection: string
  name: string
  value: { [index: string]: string }
}
interface GroupShare {
  attribute_uuid: string
  expiry: string
}
// End GroupState

// AttributeState
interface AttributeState extends StateSlice {
  verify: null
}
interface AttributeType {
  id: number
  name: string
  default_collection: string
  verify_seconds: string
  preview_name: string
  preview_value: { [index: string]: string }
  value_rules: null
  actions: AttributeAction[]
}
interface AttributeAction {
  name: string
  display_name: string
  icon: string
  user_only: boolean
  unverified_only: boolean
  action_value: string
}
// End AttributeState

// ShareState
interface ShareState extends StateSlice {
  shareList: ShareItem[] | null
  shareAttributes: ShareAttribute[] | null
}
interface ShareItem {
  uuid: string
  name: string
  avatar: string
}
interface ShareAttribute {
  uuid: string
  share_expiry: string | null
}
// End ShareState

// UtilState
interface UtilState extends StateSlice {
  offline: boolean
  swipeIndex: number
}
// End UtilState
