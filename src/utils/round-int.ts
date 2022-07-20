export function roundInt (value: number, round: number, up: boolean): number {
  const proc = (value * round / 100)
  return Math.floor(value + (up ? proc : -proc))
}
