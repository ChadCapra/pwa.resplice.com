import { UtilState } from './util/types'
import { AuthState } from './auth/types'
import { UserState } from './user/types'
import { ContactState } from './contact/types'
import { GroupState } from './group/types'

export interface RespliceState {
  utilState: UtilState
  authState: AuthState
  userState: UserState
  contactState: ContactState
  groupState: GroupState
}

export * from './util/types'
export * from './auth/types'
export * from './user/types'
export * from './contact/types'
export * from './group/types'
