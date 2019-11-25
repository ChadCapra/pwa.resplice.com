import { UtilState } from './util/types'
import { AuthState } from './auth/types'
import { UserState } from './user/types'

export interface RespliceState {
  utilState: UtilState
  authState: AuthState
  userState: UserState
  // contactState: ContactState
  // groupState: GroupState
}

export * from './util/types'
export * from './auth/types'
export * from './user/types'
