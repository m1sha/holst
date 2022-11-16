export function rgb2yuv (r: number, g: number, b: number) {
  const y = r * 0.257 + g * 0.504 + b * 0.098 + 16
  const u = r * -0.148 + g * -0.291 + b * 0.439 + 128
  const v = r * 0.439 + g * -0.368 + b * -0.071 + 128
  return [y, u, v]
}
