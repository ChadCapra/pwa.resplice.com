export interface AuthState {
  loading: boolean
  error: string | null
  session: Session | null
  loginValues: { phone: string; email: string } | null
}
export type Session = {
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
  user_registered_at: string
  expiry: string
}

export const CREATE_SESSION = 'CREATE_SESSION'
export const VERIFY_SESSION = 'VERIFY_SESSION'
export const GET_SESSION = 'GET_SESSION'
export const GET_SESSIONS = 'GET_SESSIONS'
export const ACCEPT_EULA = 'ACCEPT_EULA'
export const REGISTER = 'REGISTER'
export const DELETE_SESSION = 'DELETE_SESSION'

// interface LogoutAction {
//   type: typeof LOGOUT
//   meta: {
//     timestamp: number
//   }
// }

interface CreateSessionAction {
  type: typeof CREATE_SESSION
  payload?: { session: Session; loginValues: { phone: string; email: string } }
  loading?: boolean
  error?: string | null
}

interface VerifySessionAction {
  type: typeof VERIFY_SESSION
  payload?: Session
  loading?: boolean
  error?: string | null
}

interface AcceptEulaAction {
  type: typeof ACCEPT_EULA
  payload?: Session
  loading?: boolean
  error?: string | null
}

interface RegisterAction {
  type: typeof REGISTER
  payload?: Session
  loading?: boolean
  error?: string | null
}

interface GetSessionAction {
  type: typeof GET_SESSION
  payload?: Session
  loading?: boolean
  error?: string | null
}

interface GetSessionsAction {
  type: typeof GET_SESSIONS
  payload?: Session
  loading?: boolean
  error?: string | null
}

interface DeleteSessionAction {
  type: typeof DELETE_SESSION
  payload?: Session
  loading?: boolean
  error?: string | null
}

export type AuthActions =
  | CreateSessionAction
  | VerifySessionAction
  | AcceptEulaAction
  | RegisterAction
  | GetSessionAction
  | GetSessionsAction
  | DeleteSessionAction
