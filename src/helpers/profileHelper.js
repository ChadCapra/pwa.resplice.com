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
  { profile, requested_at },
  types
) => {
  profile.requested_at = requested_at
  profile.collections = buildCollections(profile.attributes, types, true)
  profileList[profile.uuid] = profile
  return profileList
}
