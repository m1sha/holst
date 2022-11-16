import { IPixel } from '../pixel'

export function distance (color1: IPixel, color2: IPixel): number {
  const rm = (color1.r + color2.r) / 2
  const dr = color1.r - color2.r
  const dg = color1.g - color2.g
  const db = color1.b - color2.b
  return Math.sqrt((((512 + rm) * dr * dr) >> 8) + 4 * dg * dg + (((767 - rm) * db * db) >> 8))
}
