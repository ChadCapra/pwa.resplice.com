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

export * from './attribute'
export * from './contact'
