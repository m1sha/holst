import { IVector } from './vector'
import { Point, IPoint } from './point'

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

const alfa = (vector: IVector): number => {
  const { x, y } = new Point(vector.ep).dec(vector.sp)
  return Math.atan2(y, x)
}

const gradToRad = (angle: number): number => {
  return angle * Math.PI / 180
}

const arrow = (vector: IVector, r: number, dir: number): IPoint[] => {
  const result = []
  const angle = alfa(vector)
  const point = dir < 0 ? vector.sp : vector.ep
  const turn = Math.PI / 24
  const cos1 = dir * Math.cos(angle - turn)
  const sin1 = dir * Math.sin(angle - turn)
  result.push({ x: point.x, y: point.y })
  result.push({ x: point.x - r * cos1, y: point.y - r * sin1 })
  result.push({ x: point.x, y: point.y })

  const cos2 = dir * Math.cos(angle + turn)
  const sin2 = dir * Math.sin(angle + turn)
  result.push({ x: point.x - r * cos2, y: point.y - r * sin2 })
  return result
}

export { rotate, arrow }
