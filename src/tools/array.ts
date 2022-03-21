export default {
  asc (field: string, fieldType?: string) {
    return sort(1, field, fieldType || '')
  },

  desk (field: string, fieldType: string) { // desc
    return sort(-1, field, fieldType)
  }
}

function sort (direct: number, field: string, fieldType: string) {
  return function (a: Record<string, unknown>, b: Record<string, unknown>) {
    const l = toType(a[field], fieldType)
    const r = toType(b[field], fieldType)

    if (l < r) return direct * -1
    if (l > r) return direct * 1
    return 0
  }
}

export function removeItem<T> (items: T[], predicate: (item: T, index: number) => boolean): void {
  let index = -1
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (predicate(item, i)) {
      index = i
      break
    }
  }
  if (index >= 0) items.splice(index, 1)
}

function toType (value: unknown, fieldType: string) {
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

  return nValue as number
}
