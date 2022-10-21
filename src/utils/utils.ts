import { Point, IPoint } from '../core/geometry/point'
import { Rect } from '../core/geometry/rect'
import { Size } from '../core/geometry/size'

const size = (width: number, height: number): Size => {
  return { width, height }
}

const toAbsolute = (point: Point, location: Point) : Point => {
  return new Point({
    x: location.x + point.x,
    y: point.y + location.y
  })
}

const IsPointInPolygon4 = (polygon: Point[], point: Point) => {
  let result = false
  let j = polygon.length - 1
  for (let i = 0; i < polygon.length; i++) {
    if ((polygon[i].y < point.y && polygon[j].y >= point.y) || (polygon[j].y < point.y && polygon[i].y >= point.y)) {
      if (polygon[i].x + (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) * (polygon[j].x - polygon[i].x) < point.x) {
        result = !result
      }
    }
    j = i
  }
  return result
}

const calcBounds = (points: IPoint[]): Rect => {
  if (points.length === 0) return new Rect(0, 0, 0, 0)
  const xList = points.map(p => p.x)
  const yList = points.map(p => p.y)
  const x = Math.min.apply(null, xList)
  const y = Math.min.apply(null, yList)
  const x1 = Math.max.apply(null, xList)
  const y1 = Math.max.apply(null, yList)
  return new Rect(x, y, x1 - x, y1 - y)
}

export { size, toAbsolute, IsPointInPolygon4, calcBounds }
