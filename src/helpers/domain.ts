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
  const collections: Dictionary<
    (Attribute & {
      attribute_type: AttributeType
    })[]
  > = {}
  Object.values(attributes).forEach((attr) => {
    const type = attributeTypes.find(
      (type) => type.id === attr.attribute_type_id
    )
    if (type) {
      const attrWithType = { ...attr, attribute_type: type }
      if (collections[attr.collection])
        collections[attr.collection].push(attrWithType)
      else collections[attr.collection] = [attrWithType]
    }
  })
  return collections
}

export const handleAttributeAction = (actionName: string, value: string[]) => {
  const v = value.join(' ')
  switch (actionName) {
    case 'call':
      window.open(`tel:+${v}`)
      break
    case 'sms':
      window.open(`sms:+${v}`)
      break
    case 'email':
      window.open(`mailto:${v}`)
      break
    case 'map':
      window.open(`https://maps.google.com/?q=${v}`)
      break
    case 'nav':
      window.open(`https://maps.google.com/?daddr=${v}`)
      break
    case 'calender':
      console.log('How to do calender links??')
      break
    case 'copy':
      navigator.clipboard.writeText(v)
      // show copied popup
      break
    default:
      console.log(actionName)
  }
}
