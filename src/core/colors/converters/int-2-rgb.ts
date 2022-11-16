export function int2rgb (value: number): [number, number, number, number] {
  return [(value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff, 1]
}
