export interface AuthState {
  loading: boolean
  error: string | null
  session: Session | null
  loginValues: { phone: string; email: string } | null
  locale: string
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
  user_registered_at: string
  expiry: string
}

export const SET_LOCALE = 'SET_LOCALE'
export const CREATE_SESSION = 'CREATE_SESSION'
export const VERIFY_SESSION = 'VERIFY_SESSION'
export const ACCEPT_EULA = 'ACCEPT_EULA'
export const REGISTER = 'REGISTER'

interface SetLocaleAction {
  type: typeof SET_LOCALE
  payload: string
}

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

export type AuthActions =
  | SetLocaleAction
  | CreateSessionAction
  | VerifySessionAction
  | AcceptEulaAction
  | RegisterAction
