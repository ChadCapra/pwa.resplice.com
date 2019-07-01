/**
 *
 * @param {Object[]} arr - Object array to convert
 * @param {String} key - Key in object to use as the key for the dictionary
 * @returns Converted array as a dictionary
 */
export const objectArrToDict = (
  arr: Array<Dictionary>,
  key: string
): ObjectDictionary => {
  const dict: ObjectDictionary = {}
  arr.forEach(item => {
    const keyValue = item[key]
    dict[keyValue] = item
  })
  return dict
}

/**
 * Takes in a string and capitalizes it
 * @param {String} str - String to capitalize
 * @returns {String}
 */
export const capitalizeString = (str: string): string => {
  if (str.length) return str[0].toUpperCase() + str.slice(1)
  throw new Error('Invalid string, must be a non-empty string')
}

/**
 * Compares the two timestamps and returns a human readable time length
 * @param {Date} laterTimestamp - 1st timestamp to compare (Later time)
 * @param {Date} earlierTimestamp - 2nd timestamp to compare (Earlier Time)
 * @returns {String}
 */
export const getTimeRemaining = (
  laterTimestamp: Date,
  earlierTimestamp: Date
): string => {
  const one_day_ms = 1000 * 60 * 60 * 24
  const one_hour_ms = 1000 * 60 * 60
  const millisecondsBetween: number =
    laterTimestamp.getTime() - earlierTimestamp.getTime()
  const days: number = Math.round(millisecondsBetween / one_day_ms)

  if (days === 1) return '1 day'
  else if (days > 1) return `${days} days`
  else {
    const hours: number = Math.round(millisecondsBetween / one_hour_ms)
    if (hours === 1) return '1 hour'
    else if (hours > 1) return `${hours} hours`
    else return 'less than an hour'
  }
}

/**
 * Sorts strings alphabetically when used in combination with Array.sort()
 * @param {String} strA
 * @param {String} strB
 * @returns {Number} -1 => less than, 1 => greater than, 0 => equal
 */
export const alphabetSort = (strA: string, strB: string): number => {
  if (strA < strB) return -1
  if (strA > strB) return 1
  return 0
}

export * from './attributeHelper'
export * from './profileHelper'
