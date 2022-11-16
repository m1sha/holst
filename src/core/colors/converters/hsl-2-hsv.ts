import { THSV } from './types/hsv'

export function hsl2hsv (h: number, s: number, l: number): THSV {
  const result: THSV = { h, s: 0, v: 0 }
  result.v = l + s * Math.min(l, 1 - l)
  result.s = result.v === 0 ? 0 : 2 * (1 - l / result.v)
  return result
}
