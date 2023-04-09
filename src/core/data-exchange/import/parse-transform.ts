
import { Matrix2D } from '../../matrix'

export function parseTransform (m: string): Matrix2D {
  const arr = m.split(' ').map(p => parseFloat(p))
  if (arr.length !== 6) throw new Error('')
  if (arr.some(p => isNaN(p))) throw new Error('')
  const [a, b, c, d, e, f] = arr
  return new Matrix2D({ a, b, c, d, e, f })
}
