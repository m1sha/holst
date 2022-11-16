import { IPixel } from '../pixel'

export function contrastRatio (color1: IPixel, color2: IPixel, foreground?: boolean): number {
  const l1 = getContrast(color1)
  const l2 = getContrast(color2)
  return foreground ? (l2 + 0.05) / (l1 + 0.05) : (l1 + 0.05) / (l2 + 0.05)
}

function getContrast (color: IPixel) {
  const { r, g, b } = color
  const f = (c: number): number => c < 11 ? c / 255 / 12.92 : Math.pow(((c / 255 + 0.055) / 1.055), 2.4)
  const l = 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
  return l
}
