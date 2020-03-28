import { UtilState, AttributeType } from './util/types'
import { AuthState } from './auth/types'
import { UserState, IUserAttribute } from './user/types'
import { ContactState, ContactAttribute } from './contact/types'
import { GroupState, GroupAttribute } from './group/types'

export interface RespliceState {
  utilState: UtilState
  authState: AuthState
  userState: UserState
  contactState: ContactState
  groupState: GroupState
}

export type IEntityAttribute =
  | IUserAttribute
  | ContactAttribute
  | GroupAttribute
export type IEntityAttributeWithType = IEntityAttribute & {
  attribute_type: AttributeType
}

export * from './util/types'
export * from './auth/types'
export * from './user/types'
export * from './contact/types'
export * from './group/types'
