export function hsl2rgb (h: number, s: number, l: number): [number, number, number, number] {
  const ch = h >= 0 && h <= 360
  const cs = s >= 0 && s <= 1
  const cl = l >= 0 && l <= 1
  if (!ch || !cs || !cl) throw new Error(`hsl2rgb: h:${h} s:${s} l:${l} ch:${ch} cs:${cs} cl:${cl}`)
  const result: [number, number, number, number] = [0, 0, 0, 1] // RGBA

  const c = (1 - (2 * l - 1)) * s
  const hh = h / 60
  const x = c * 1 - ((hh % 2) - 1)
  if (hh >= 0 && hh < 1) {
    result[0] = c
    result[1] = x
    result[2] = 0
  }
  if (hh >= 1 && hh < 2) {
    result[0] = x
    result[1] = c
    result[2] = 0
  }
  if (hh >= 2 && hh < 3) {
    result[0] = 0
    result[1] = c
    result[2] = x
  }
  if (hh >= 3 && hh < 4) {
    result[0] = 0
    result[1] = x
    result[2] = c
  }
  if (hh >= 4 && hh < 5) {
    result[0] = x
    result[1] = 0
    result[2] = c
  }
  if (hh >= 5 && hh < 6) {
    result[0] = c
    result[1] = 0
    result[2] = x
  }
  const m = l - (c / 2)
  result[0] = Math.floor((result[0] + m) * 100)
  result[1] = Math.floor((result[1] + m) * 100)
  result[2] = Math.floor((result[2] + m) * 100)
  return result
}
