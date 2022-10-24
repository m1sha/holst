export function truncate (x: number) {
  if (x < 0) return 0
  if (x > 255) return 255
  return x
}
