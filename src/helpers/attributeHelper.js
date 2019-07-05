/**
 * Processes attributes with an optional action
 * @param {Object} attributes - Attribute Dictionary
 * @param {Object} types - Attribute Types Dictionary
 * @param {Object} [config] - Optional configurations
 * @param {Object} config.data - Optional data
 * @param {String} config.action - Optional Action
 */
export const processAttributes = (attributes, types, config) => {
  if (config) {
    const { action, data } = config
    switch (action) {
      case 'add': // Add and edit do the same thing
      case 'edit':
        attributes[data.uuid] = data
        break
      case 'delete':
        delete attributes[data.uuid]
        break
      case 'toggleShareOn':
        attributes[data].qr_sharable = true
        break
      case 'toggleShareOff':
        attributes[data].qr_sharable = false
        break
      case 'toggleContactShareOn':
        break
      case 'toggleGroupShareOn':
        break
      default:
    }
  }
  return { attributes, collections: buildCollections(attributes, types) }
}

/**
 * Attaches actions to attributes and builds their collections
 * @param {Object} attributes - Attribute Dictionary
 * @param {Object} types - Attribute Types Dictionary
 * @param {Boolean} [contact] - Indicates if the attributes are for a contact
 * @returns {Object} Returns built collections with actions
 */
export const buildCollections = (attributes, types, contact) => {
  const collections = {}
  Object.values(attributes).forEach(attr => {
    let actions = []
    if (contact) {
      actions = types[attr.attribute_type_id].actions.filter(
        action => !action.user_only
      )
    } else {
      actions = types[attr.attribute_type_id].actions.filter(
        action => !action.unverified_only || !attr.verified_recency
      )
    }

    attr.actions = actions
    collections[attr.collection]
      ? collections[attr.collection].push(attr)
      : (collections[attr.collection] = [attr])
  })
  return collections
}

const updateAttrUuids = (uuidList, uuid) => {
  const idx = uuidList.findIndex(u => u === uuid)
  if (idx < 0) {
    uuidList.push(uuid)
  } else {
    uuidList.splice(idx, 1)
  }
  return uuidList
}

/**
 * Formats an attribute value based on it's rules
 * @param {String[]} values - Values to combine and format
 * @returns {String} Formatted value
 */
export const formatAttrValues = values => {
  return Object.values(values).reduce((accum, value, idx) => {
    if (!value) return accum
    if (idx < 1) return value
    return accum.concat(' ', value)
  }, '')
}

/**
 * Copies value to the clipboard
 * @param {String} value - Value to copy
 */
export const copyToClipboard = value => {
  const text = this.combineAttrValues(value, ' ')
  let el = document.createElement('textarea')
  el.value = text
  el.setAttribute('readonly', '')
  el.style = { display: 'hidden', position: 'absolute', left: '-9999px' }
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

/**
 * Runs an attribute action
 * @param {String} action
 * @param {Object} attr
 */
export const handleAttributeAction = (action, value) => {
  switch (action) {
    case 'call':
      window.open(`tel:${value.phone}`)
      break
    case 'sms':
      window.open(`sms:${value.phone}`)
      break
    case 'email':
      window.open(`mailto:${value.email}`)
      break
    case 'map':
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${formatAttrValues(
          value,
          '+'
        )}`
      )
      break
    case 'nav':
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${formatAttrValues(
          value,
          '+'
        )}&dir_action=navigate`
      )
      break
    case 'navigate':
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${formatAttrValues(
          value,
          ','
        )}&dir_action=navigate`
      )
      break
    case 'locate':
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${formatAttrValues(
          value,
          ','
        )}`
      )
      break
    case 'link':
      window.open(value.url)
      break
    case 'calendar':
      copyToClipboard(value)
      break
    case 'copy':
      copyToClipboard(value)
      break
    default:
  }
}

/**
 * Runs a bulk action
 * @param {String} action - Type of action to be done
 * @param {Object[]} attributeValues - Array of values to perform an action on
 */
export const handleBulkAction = (action, attributeValues) => {
  switch (action) {
    case 'email':
      window.open(`mailto:${attributeValues.split(',')}`)
      break
    case 'sms':
      window.open(`sms:${attributeValues.split(',')}`)
      break
    case 'map':
      // window.open(
      //   `https://www.google.com/maps/search/?api=1&query=${formatAttrValues(
      //     value,
      //     '+'
      //   )}`
      // )
      break
    default:
  }
}
