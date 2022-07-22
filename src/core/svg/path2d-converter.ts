import { Point } from '../point'
import { MutablePath2D } from '../path2d/mutable-path2d'
import { SvgPathDElement } from './svg-path-d-element'

export function toPath2D (items: SvgPathDElement[], position: Point, path2d?: MutablePath2D): { path: MutablePath2D, position: Point } {
  const path = path2d || new MutablePath2D()
  position.x = 0
  position.y = 0
  for (const item of items) {
    switch (item.type) {
      case 'C': {
        const { point1, point2, point } = item
        position.x = point.x
        position.y = point.y
        path.bezierCurveTo(point1.x, point1.y, point2.x, point2.y, point.x, point.y)
        continue
      }
      case 'c': {
        path.moveTo(position.x, position.y)
        const { point1, point2, point } = item
        position.x = point.x
        position.y = point.y
        path.bezierCurveTo(point1.x, point1.y, point2.x, point2.y, point.x, point.y)
        continue
      }
      case 'S': {
        throw new Error('Not Implemented!')
      }
      case 's': {
        throw new Error('Not Implemented!')
      }
      case 'Q': {
        const { point1, point } = item
        position.x = point.x
        position.y = point.y
        path.quadraticCurveTo(point1.x, point1.y, point.x, point.y)
        continue
      }
      case 'q': {
        path.moveTo(position.x, position.y)
        const { point1, point } = item
        position.x = point.x
        position.y = point.y
        path.quadraticCurveTo(point1.x, point1.y, point.x, point.y)
        continue
      }
      case 'T': {
        throw new Error('Not Implemented!')
      }
      case 't': {
        throw new Error('Not Implemented!')
      }
      case 'A': {
        const { point, target, angle, largeArcFlag, sweepFlag } = item
        path.ellipse(target.x, target.y, point.x, point.y, angle, largeArcFlag, Math.PI, Boolean(sweepFlag))
        throw new Error('Not Implemented!')
      }
      case 'a': {
        throw new Error('Not Implemented!')
      }
      case 'M': {
        const p = item.point
        position.x = p.x
        position.y = p.y
        path.moveTo(position.x, position.y)
        continue
      }
      case 'm': {
        const p = item.point
        position.x = p.x
        position.y = p.y
        continue
      }
      case 'V':
        position.y = item.height
        path.lineTo(position.x, position.y)
        continue
      case 'v': {
        path.moveTo(position.x, position.y)
        position.y += item.height
        path.lineTo(position.x, position.y)
        continue
      }
      case 'H':
        position.x = item.width
        path.lineTo(position.x, position.y)
        continue
      case 'h': {
        path.moveTo(position.x, position.y)
        position.x += item.width
        path.lineTo(position.x, position.y)
        continue
      }
      case 'L':
        position.x = item.point.x
        position.y = item.point.y
        path.lineTo(position.x, position.y)
        continue
      case 'l':
        position.x += item.point.x
        position.y += item.point.y
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
