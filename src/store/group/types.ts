export interface GroupState {
  loading: boolean
  error: Dictionary<any> | null
  groups: Dictionary<GroupRecord> | null
  groups_loaded_at: Date | null
}
export interface Group {
  uuid: string
  name: string
  avatar: string | null
  joined_at: string
  member_count: number
  member_uuids: string[]
  pending_attribute_value: Dictionary<string>
  requested_at: string
}
export interface GroupRecord extends Group {
  members: Dictionary<GroupMember>
  attributes: Dictionary<GroupAttribute>
  shares: Dictionary<GroupShare>
}
export interface GroupMember {
  group_uuid: string
  contact_uuid: string
  name: string
}
export interface GroupAttribute {
  group_uuid: string
  attribute_uuid: string
  attribute_type_id: number
  collection: string
  name: string
  value: Dictionary<string>
}
export interface GroupShare {
  group_uuid: string
  attribute_uuid: string
  expiry: string
}

export const FETCH_GROUPS = 'FETCH_GROUPS'

interface FetchGroupsAction {
  type: typeof FETCH_GROUPS
  payload?: Dictionary<GroupRecord>
  loading?: boolean
  error?: Dictionary<any> | null
}

export type GroupActions = FetchGroupsAction
