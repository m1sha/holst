import { hex2rgb } from './hex-2-rgb'
import { hsv2rgb } from './hsv-2-rgb'
import { str2Hsv } from './str-2-hsv'

export function str2rgba (value: string): [number, number, number, number] {
  if (value.charAt(0) === '#') return hex2rgb(value)
  if (value.startsWith('hsv(')) {
    const { h, s, v } = str2Hsv(value)
    return hsv2rgb(h, s, v)
  }
  throw new Error()
}
