import { Point } from './point'

const rotate = (point: Point, target: Point, angle: number): Point => {
  const result = new Point(point)
  const rad = gradToRad(angle)
  const sin = Math.sin(rad)
  const cos = Math.cos(rad)
  result.x -= target.x
  result.y -= target.y
  const px = result.x * cos - result.y * sin
  const py = result.x * sin + result.y * cos
  result.x = px + target.x
  result.y = py + target.y
  return result
}

const alfa = (pointStart: Point, pointEnd: Point): number => {
  const dx = pointEnd.x - pointStart.x
  const dy = pointEnd.y - pointStart.y
  return Math.atan2(dy, dx)
}

const gradToRad = (angle: number): number => {
  return angle * Math.PI / 180
}

// const arrow = (context, point: Point, angle: number, r: number, dir: number) => {
//   const cos1 = dir * Math.cos(angle - Math.PI / 6)
//   const sin1 = dir * Math.sin(angle - Math.PI / 6)
//   context.lineTo(point.x - r * cos1, point.y - r * sin1)
//   context.moveTo(point.x, point.y)
//   const cos2 = dir * Math.cos(angle + Math.PI / 6)
//   const sin2 = dir * Math.sin(angle + Math.PI / 6)
//   context.lineTo(point.x - r * cos2, point.y - r * sin2)
// }

export { rotate, alfa }
