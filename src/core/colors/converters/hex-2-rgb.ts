import { TRGBA } from './types/rgba'

export function hex2rgb (hex: string): TRGBA {
  if (hex.charAt(0) !== '#') throw new Error('hex must start with # character')
  if (hex.length === 4) {
    const r = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16)
    const g = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16)
    const b = parseInt(hex.substring(3, 4) + hex.substring(3, 4), 16)
    return { r, g, b, a: 1 }
  }
  if (hex.length === 7) {
    const r = parseInt(hex.substring(1, 3), 16)
    const g = parseInt(hex.substring(3, 5), 16)
    const b = parseInt(hex.substring(5, 7), 16)
    return { r, g, b, a: 1 }
  }
  if (hex.length === 9) {
    const r = parseInt(hex.substring(1, 3), 16)
    const g = parseInt(hex.substring(3, 5), 16)
    const b = parseInt(hex.substring(5, 7), 16)
    const a = parseInt(hex.substring(7, 9), 16) / 255
    return { r, g, b, a }
  }
  throw new Error('hex length is invalid')
}
