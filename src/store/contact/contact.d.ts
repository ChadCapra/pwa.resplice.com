interface ContactState extends StateSlice {
  contacts: Contacts | null
  contacts_loaded_at: Date | null
}
interface Contacts {
  [index: string]: Contact
}
interface Contact {
  uuid: string
  name: string
  avatar: string | null
  tags: string[]
  description
  pending_expiration: string | null
  attributes_updated_at: string
  shares_updated_at: string
  attributes: { [index: string]: ContactAttribute }
  shares: { [index: string]: ContactShare }
}
interface ContactAttribute {
  contact_uuid: string
  attribute_uuid: string
  attribute_type_id: number
  collection: string
  name: string
  value: { [index: string]: string }
  pending_attribute_value: { [index: string]: string }
  is_verified: boolean
  shared_at: string
}
interface ContactShare {
  contact_uuid: string
  attribute_uuid: string
  expiry: string
}
