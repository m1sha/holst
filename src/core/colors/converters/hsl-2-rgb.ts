import { TRGBA } from './types/rgba'

export function hsl2rgb (h: number, s: number, l: number): TRGBA {
  const ch = h >= 0 && h <= 360
  const cs = s >= 0 && s <= 1
  const cl = l >= 0 && l <= 1
  if (!ch || !cs || !cl) throw new Error(`hsl2rgb: h:${h} s:${s} l:${l} ch:${ch} cs:${cs} cl:${cl}`)
  const result: TRGBA = { r: 0, g: 0, b: 0, a: 1 }

  const c = (1 - (2 * l - 1)) * s
  const hh = h / 60
  const x = c * 1 - ((hh % 2) - 1)
  if (hh >= 0 && hh < 1) {
    result.r = c
    result.g = x
    result.b = 0
  }
  if (hh >= 1 && hh < 2) {
    result.r = x
    result.g = c
    result.b = 0
  }
  if (hh >= 2 && hh < 3) {
    result.r = 0
    result.g = c
    result.b = x
  }
  if (hh >= 3 && hh < 4) {
    result.r = 0
    result.g = x
    result.b = c
  }
  if (hh >= 4 && hh < 5) {
    result.r = x
    result.g = 0
    result.b = c
  }
  if (hh >= 5 && hh < 6) {
    result.r = c
    result.g = 0
    result.b = x
  }
  const m = l - (c / 2)
  result.r = Math.floor((result.r + m) * 100)
  result.g = Math.floor((result.g + m) * 100)
  result.b = Math.floor((result.b + m) * 100)
  return result
}
