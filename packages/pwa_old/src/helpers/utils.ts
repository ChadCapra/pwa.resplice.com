export const toDictionary = (
  key: string,
  array: Array<any>
): Dictionary<any> => {
  const dictionary: Dictionary<any> = {}
  array.forEach(item => {
    dictionary[item[key]] = item
  })
  return dictionary
}

export const omit = (key: string, object: { [key: string]: any }) => {
  const { [key]: deleted, ...newObject } = object
  return newObject
}
