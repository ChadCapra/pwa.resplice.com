export const formatAttributeValue = (value: Dictionary<string>): string => {
  return Object.values(value).reduce((formatted, val, idx) => {
    if (idx === 0) return val
    return `${formatted}\n${val}`
  }, '')
}
