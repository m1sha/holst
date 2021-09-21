export function roundInt (value: number, round: number): number {
  return Math.floor(value + (value * round / 100))
}
