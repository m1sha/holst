export type DateFormatType = 'full' | 'time'
const getDateFormat = (date: Date, format: DateFormatType): string => {
  const hh = date.getHours()
  const mm = date.getMinutes()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()
  let sMonth = month.toString()
  let sDay = day.toString()
  let sMM = mm.toString()
  if (day < 10) sDay = '0' + day
  if (month < 10) sMonth = '0' + month
  if (mm < 10) sMM = '0' + mm

  switch (format) {
    case 'full':
      return sDay + '.' + sMonth + '.' + year + ' ' + hh + ':' + sMM
    case 'time':
      return hh + ':' + sMM
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
