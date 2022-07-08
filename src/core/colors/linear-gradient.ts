type RGBAL = [number, number, number, number]
export function linearGradient (stops: RGBAL[], value: number) {
  const stopLength = 1 / (stops.length - 1)
  const valueRatio = value / stopLength
  const stopIndex = Math.floor(valueRatio)
  if (stopIndex === (stops.length - 1)) {
    return stops[stops.length - 1]
  }
  const stopFraction = valueRatio % 1
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
