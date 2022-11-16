import { THSV } from './types/hsv'

export function str2Hsv (value: string): THSV {
  const t = value.substring(4, value.length - 1)
  const [h, s, v] = t.split(',').map(p => parseInt(p.trim()))
  return { h, s, v }
}
