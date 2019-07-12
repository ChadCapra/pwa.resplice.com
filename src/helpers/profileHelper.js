import { buildCollections } from './attributeHelper'
import { objectArrToDict } from './index'

export const processSummaries = (profileList, newProfileList) => {
  newProfileList = objectArrToDict(newProfileList, 'uuid')
  Object.entries(newProfileList).forEach(summary => {
    const uuid = summary[0]
    const profile = summary[1]
    const oldProfile = profileList[uuid]
    // Merge objects
    newProfileList[uuid] = {
      ...oldProfile,
      ...profile
    }
  })

  return newProfileList
}

export const processProfile = (
  profileList,
  { requested_at, profile },
  types
) => {
  profile.requested_at = requested_at
  profile.collections = buildCollections(profile.attributes, types, true)
  // profile.shares = objectArrToDict(profile.shares, 'uuid')
  profileList[profile.uuid] = profile
  return profileList
}

export const removeProfile = (profileDict, uuid) => {
  delete profileDict[uuid]
  return profileDict
}

export const updateShares = (profile, attribute_uuid, share_expiry) => {
  if (profile.shares[attribute_uuid]) {
    delete profile.shares[attribute_uuid]
  } else {
    profile.shares[attribute_uuid] = {
      attribute_uuid,
      share_expiry
    }
  }
}

export const updateTags = (contact, tag) => {
  let newTags = [...contact.tags]
  const idx = newTags.findIndex(t => t === tag)
  if (idx < 0) {
    newTags.push(tag)
  } else {
    newTags.splice(idx, 1)
  }
  contact.tags = newTags
  return contact
}
