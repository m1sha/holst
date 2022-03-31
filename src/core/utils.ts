import { Point } from './point'
import { Size } from './size'

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

export { size, toAbsolute, IsPointInPolygon4 }
