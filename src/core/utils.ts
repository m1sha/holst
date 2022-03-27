import { Padding } from './padding'
import { Point } from './point'
import { Size } from './size'

const size = (width: number, height: number): Size => {
  return { width, height }
}

const padding = (top: number, left: number, bottom: number, right: number): Padding => {
  return { top, left, bottom, right }
}

const toAbsolute = (point: Point, location: Point, originSize: Size) : Point => {
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

export { size, padding, toAbsolute, IsPointInPolygon4 }
