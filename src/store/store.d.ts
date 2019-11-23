import { UtilState } from './util/util'
import { AuthState } from './auth/types'
import { UserState } from './user/user'

export interface RespliceState {
  utilState: UtilState
  authState: AuthState
  userState: UserState
  // contactState: ContactState
  // groupState: GroupState
}

export * from './util/util'
export * from './auth/types'
export * from './user/user'
