export interface UserState {
  profile: UserProfile | null
  attributes: { [index: string]: UserAttribute } | null
  attributes_loaded_at: Date | null
}
export interface UserProfile {
  uuid: string
  name: string
  avatar: string
  locale: string
  tags: { [index: string]: string }
  unlock_pin: string
  unlock_pin_expiry: string
  registered_at: string
  share_count: number
  attribute_count: number
  location_enabled: boolean
  notification_value_uuid: string
}
export interface UserAttribute {
  uuid: string
  attribute_type_id: number
  name: string
  collection: string
  value_uuid: string
  value: { [index: string]: string }
  verified_at: string
  latest_to_verify: boolean
  verify_expiry: string | null
  expiry: string | null
  qr_shareable: boolean
  verify_token: number | null
}
