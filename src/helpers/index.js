/**
 *
 * @param {Object[]} arr - Object array to convert
 * @param {String} key - Key in object to use as the key for the dictionary
 * @returns Converted array as a dictionary
 */
export const objectArrToDict = (arr, key) => {
  const dict = {}
  arr.forEach(item => {
    dict[item[key]] = item
  })
  return dict
}

/**
 * Takes in a string and capitalizes it
 * @param {String} str - String to capitalize
 * @returns {String}
 */
export const capitalizeString = str => {
  return str[0].toUpperCase() + str.slice(1)
}

export * from './attribute'
export * from './contact'
