import { THSV } from './types/hsv'

export function rgb2hsv (r: number, g: number, b: number): THSV {
  let computedH = 0
  let computedS = 0
  let computedV = 0

  if (r == null || g == null || b == null ||
      isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error('Please enter numeric RGB values!')
  }
  if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
    throw new Error('RGB values must be in the range 0 to 255.')
  }
  r = r / 255; g = g / 255; b = b / 255
  const minRGB = Math.min(r, Math.min(g, b))
  const maxRGB = Math.max(r, Math.max(g, b))

  // Black-gray-white
  if (minRGB === maxRGB) {
    computedV = minRGB
    return { h: 0, s: 0, v: computedV }
  }

  // Colors other than black-gray-white:
  const d = (r === minRGB) ? g - b : ((b === minRGB) ? r - g : b - r)
  const h = (r === minRGB) ? 3 : ((b === minRGB) ? 1 : 5)
  computedH = 60 * (h - d / (maxRGB - minRGB))
  computedS = (maxRGB - minRGB) / maxRGB
  computedV = maxRGB
  return { h: computedH, s: computedS, v: computedV }
}
