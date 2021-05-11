export type DateFormatType = 'full' | 'hh:mm' | 'hh:mm:ss'
const getDateFormat = (date: Date, format: DateFormatType): string => {
  const hh = date.getHours()
  const mm = date.getMinutes()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()
  const seconds = date.getSeconds()
  let sMonth = month.toString()
  let sDay = day.toString()
  let sMM = mm.toString()
  let sSs = seconds.toString()
  if (day < 10) sDay = '0' + day
  if (month < 10) sMonth = '0' + month
  if (mm < 10) sMM = '0' + mm
  if (seconds < 10) sSs = '0' + sSs

  switch (format) {
    case 'full':
      return sDay + '.' + sMonth + '.' + year + ' ' + hh + ':' + sMM
    case 'hh:mm':
      return hh + ':' + sMM
    case 'hh:mm:ss':
      return hh + ':' + sMM + ':' + sSs
  }
}

const getMax = (items: {Value: number}[]): number => {
  let result = Number.NEGATIVE_INFINITY
  for (let i = 0; i < items.length; i++) {
    const value = items[i].Value
    if (value > result) result = value
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

export { getDateFormat, getMax, roundInt }
