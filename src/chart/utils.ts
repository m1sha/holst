const getMax = (items: [], field: string): number => {
  let result = Number.NEGATIVE_INFINITY
  for (let i = 0; i < items.length; i++) {
    const value = items[i][field]
    if (value > result) result = value
  }
  return result
}
const getMin = (items: [], field: string): number => {
  let result = Number.POSITIVE_INFINITY
  for (let i = 0; i < items.length; i++) {
    const value = items[i][field]
    if (value < result) result = value
  }
  return result
}

const roundInt = (value: number): number => {
  const digits = Math.floor(value).toString()
  const digitCount = digits.length
  if (digitCount === 1) return 10
  if (digitCount === 2) return 100
  const major = Math.pow(10, digitCount - 1)
  return ((parseInt(digits.charAt(0)) + 1) * major)
}

export { roundInt, getMax, getMin }
