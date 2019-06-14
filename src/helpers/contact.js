import { buildCollections } from './attribute'

export const processSummaries = (contactList, newContactList) => {
  Object.entries(newContactList).forEach(summary => {
    const uuid = summary[0]
    const contact = summary[1]
    const oldContact = contactList[uuid]
    // Merge objects
    newContactList[uuid] = {
      ...oldContact,
      ...contact
    }
  })

  return newContactList
}

export const processContact = (
  contactList,
  { contact, requested_at },
  types
) => {
  contact.requested_at = requested_at
  contact.collections = buildCollections(contact.attributes, types)
  contactList[contact.uuid] = contact
  return contactList
}
