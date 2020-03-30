import {
  IUserAttribute,
  ContactAttribute,
  GroupAttribute,
  AttributeType
} from '../store/store'

type Attribute = IUserAttribute | ContactAttribute | GroupAttribute

export const formatAttributeValue = (value: Dictionary<string>): string => {
  return Object.values(value).reduce((formatted, val, idx) => {
    if (idx === 0) return val
    return `${formatted}\n${val}`
  }, '')
}

// Building collections might get expensive.
// Consider moving this operation after api call
// and storing in global state
export const buildCollections = (
  attributes: Dictionary<Attribute>,
  attributeTypes: AttributeType[]
) => {
  const collections: Dictionary<(Attribute & {
    attribute_type: AttributeType
  })[]> = {}
  Object.values(attributes).forEach(attr => {
    const type = attributeTypes.find(type => type.id === attr.attribute_type_id)
    if (type) {
      const attrWithType = { ...attr, attribute_type: type }
      if (collections[attr.collection])
        collections[attr.collection].push(attrWithType)
      else collections[attr.collection] = [attrWithType]
    }
  })
  return collections
}

export const handleAttributeAction = (actionName: string) => {
  console.log(actionName)
}
