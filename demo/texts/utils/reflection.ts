export function getValue (obj: any, path: string) {
  const paths = path.split('.')
  let result = obj
  for (const field of paths) result = result[field]
  return result
}

export function setValue (obj: any, path: string, value: unknown) {
  const paths = path.split('.')
  let result = obj
  for (let i = 0; i < paths.length - 1; i++) result = result[paths[i]]
  result[paths[paths.length - 1]] = value
}
