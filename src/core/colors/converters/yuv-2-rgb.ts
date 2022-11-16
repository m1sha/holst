export function yuv2rgb (y: number, u: number, v: number): [number, number, number, number] {
  y -= 16; u -= 128; v -= 128
  return [1.164 * y + 1.596 * v, 1.164 * y - 0.392 * u - 0.813 * v, 1.164 * y + 2.017 * u, 1]
}
