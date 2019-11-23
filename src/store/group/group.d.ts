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
