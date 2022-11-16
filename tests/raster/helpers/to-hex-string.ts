export function toHexString (r: Readonly<number[]>, g: Readonly<number[]>, b: Readonly<number[]>): string {
  let result = ''
  for (let i = 0; i < r.length; i++) {
    result += r[i].toString(16).padStart(2, '0').toUpperCase()
    result += g[i].toString(16).padStart(2, '0').toUpperCase()
    result += b[i].toString(16).padStart(2, '0').toUpperCase()
    result += ' '
  }
  return result.trimEnd()
}
