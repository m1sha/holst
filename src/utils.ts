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

export { getDateFormat, getMax }
