import { IPixel } from '../pixel'

export function invert ({ r, g, b, a }: IPixel): [number, number, number, number] {
  return [255 - r, 255 - g, 255 - b, a]
}
