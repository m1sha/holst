import { Point } from '../point'
import { MutablePath2D } from '../path2d/mutable-path2d'
import { SvgPathDElement } from './svg-path-d-element'

export function toPath2D (items: SvgPathDElement[], position: Point, path2d?: MutablePath2D): { path: MutablePath2D, position: Point } {
  const path = path2d || new MutablePath2D()
  const dx = 1
  const dy = 1
  const scale: number = 1

  position.x = 0
  position.y = 0
  for (const item of items) {
    switch (item.type) {
      case 'C': {
        const p1 = Point.mul(Point.mul(item.point1, new Point(dx, dy)), new Point(scale, scale))
        const p2 = Point.mul(Point.mul(item.point2, new Point(dx, dy)), new Point(scale, scale))
        const p = Point.mul(Point.mul(item.point, new Point(dx, dy)), new Point(scale, scale))
        position.x = p.x
        position.y = p.y
        path.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p.x, p.y)
        continue
      }
      case 'c': {
        path.moveTo(position.x, position.y)
        const p1 = Point.mul(Point.mul(Point.sum(position, item.point1), new Point(dx, dy)), new Point(scale, scale))
        const p2 = Point.mul(Point.mul(Point.sum(position, item.point2), new Point(dx, dy)), new Point(scale, scale))
        const p = Point.mul(Point.mul(Point.sum(position, item.point), new Point(dx, dy)), new Point(scale, scale))
        position.x = p.x
        position.y = p.y
        path.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p.x, p.y)
        continue
      }
      case 'M': {
        const p = Point.mul(Point.mul(item.point, new Point(dx, dy)), new Point(scale, scale))
        position.x = p.x
        position.y = p.y
        path.moveTo(position.x, position.y)
        continue
      }
      case 'm': {
        const p = Point.mul(Point.mul(Point.sum(position, item.point), new Point(dx, dy)), new Point(scale, scale))
        position.x = p.x
        position.y = p.y
        continue
      }
      case 'V':
        position.y = item.height * dy
        path.lineTo(position.x, position.y)
        continue
      case 'v': {
        path.moveTo(position.x, position.y)
        position.y += item.height * dy * scale
        path.lineTo(position.x, position.y)
        continue
      }
      case 'H':
        position.x = item.width * dx
        path.lineTo(position.x, position.y)
        continue
      case 'h': {
        path.moveTo(position.x, position.y)
        position.x += item.width * dx * scale
        path.lineTo(position.x, position.y)
        continue
      }
      case 'L':
        position.x = item.point.x * dx * scale
        position.y = item.point.y * dy * scale
        path.lineTo(position.x, position.y)
        continue
      case 'l':
        position = Point.sum(position, item.point)
        path.lineTo(item.point.x, item.point.y)
        continue
      case 'Z':
      case 'z':
        path.closePath()
        continue
    }
  }
  return { path, position }
}
