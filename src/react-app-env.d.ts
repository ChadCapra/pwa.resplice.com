/// <reference types="react-scripts" />

// Utility Types
interface Dictionary {
  [index: string]: any
}

interface ObjectDictionary {
  [index: string]: object
}

interface Match {
  path: string
}
// End Utility Types

// Redux State Types
type AsyncAction = (...args: any[]) => Promise<void>
type Action = (...args: any[]) => { type: string; payload?: any }
interface StateSlice {
  loading: boolean
  error: Error | null
}
interface Error {
  item: string
  msg: string
  statusCode: number
}

interface RespliceState {
  authState: AuthState
  userState: UserState
  contactState: object
  groupState: object
  attributeState: object
  shareState: object
  utilState: UtilState
}

// AuthState
interface AuthState extends StateSlice {
  isAuthorized: boolean
  isVerified: boolean
  login: Login | null
  verification: Verification | null
}
interface Login {
  login_uuid
  values: LoginValues
  verify_token_1: number
  verify_token_2: number
  expry: string
  requested_at: string
}
interface LoginValues {
  phone: string
  email: string
}
interface Verification {
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
  attributes: UserAttributes | null
  collections: UserCollections | null
  types: AttributeTypes | null
  settings: Settings | null
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
interface UserAttributes {}
interface UserCollections {}
interface Settings {}
// End UserState

// AttributeState
interface AttributeTypes {}
// End AttributeState

// UtilState
interface UtilState extends StateSlice {
  offline: boolean
  swipeIndex: number
}
// End UtilState
