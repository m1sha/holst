export default {
  asc (field: string) {
    return sort(1, field)
  },

  desk (field: string) { // desc
    return sort(-1, field)
  }
}

function sort (direct: number, field: string) {
  return function (a: Record<string, unknown>, b: Record<string, unknown>) {
    const l = a[field] as number
    const r = b[field] as number

    if (l < r) return direct * -1
    if (l > r) return direct * 1
    return 0
  }
}

export function removeItem<T> (items: T[], predicate: ((item: T, index: number) => boolean) | number): void {
  if (typeof predicate === 'number') {
    items.splice(predicate, 1)
    return
  }

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

export function lastItem<T> (items: T[]): T {
  return items[items.length - 1]
}
