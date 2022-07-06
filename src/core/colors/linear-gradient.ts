type RGBAL = [number, number, number, number, number]
export function linearGradient (stops: RGBAL[], value: number) {
  let stopIndex = 0
  const stop = stops[stopIndex + 1]
  while (stop[4] < value) {
    stopIndex++
  }

  const remainder = value - stops[stopIndex][4]
  const stopFraction = remainder / (stops[stopIndex + 1][4] - stops[stopIndex][4])

  return lerp(stops[stopIndex], stops[stopIndex + 1], stopFraction)
}

function lerp (color0: RGBAL, color1: RGBAL, value: number) {
  return [
    color0[0] + (color1[0] - color0[0]) * value,
    color0[1] + (color1[1] - color0[1]) * value,
    color0[2] + (color1[2] - color0[2]) * value,
    color0[3] + (color1[3] - color0[3]) * value
  ]
}
