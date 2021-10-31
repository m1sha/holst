export default {
  asc (field, fieldType?) {
    return sort(1, field, fieldType)
  },

  desk (field, fieldType) { // desc
    return sort(-1, field, fieldType)
  }
}

function sort (direct, field, fieldType) {
  return function (a, b) {
    const l = toType(a[field], fieldType)
    const r = toType(b[field], fieldType)

    if (l < r) return direct * -1
    if (l > r) return direct * 1
    return 0
  }
}

function toType (value, fieldType) {
  const nValue = value
  //   if (fieldType === 'date') {
  //     if (nValue.indexOf('-') > -1) {
  //       return new Date(nValue).getTime()
  //     }
  //     const ii = DateTime.parse(nValue)
  //     return !ii ? 0 : ii.getTime()
  //   }

  //   if (fieldType === 'human-string') {
  //     return toHs(value)
  //   }

  return nValue
}
