import { IPixel } from '../pixel'

export function rgb2floatArray ({ r, g, b, a }: IPixel): [number, number, number, number] {
  return [r / 255, g / 255, b / 255, a]
}
