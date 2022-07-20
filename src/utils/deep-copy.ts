export function deepCopyFast<T> (object: T): T {
  return JSON.parse(JSON.stringify(object))
}
