import { POINT, Point } from '../point'
import { point } from '../utils'
import { SvgPathDElement } from './svg-path-d-element'

export function toPath2D (items: SvgPathDElement[], position: Point, path2d?: Path2D, ratio?: Point, scale: number = 1, move: Point = { x: 0, y: 0 }): Path2D {
  const path = path2d || new Path2D()
  const dx = ratio ? ratio.x : 1
  const dy = ratio ? ratio.y : 1
  position.x = move.x
  position.y = move.y
  for (const item of items) {
    switch (item.type) {
      case 'M': {
        const p = POINT.mul(POINT.mul(item.point, point(dx, dy)), point(scale, scale))
        position.x = p.x
        position.y = p.y
        continue
      }
      case 'm': {
        const p = POINT.mul(POINT.mul(POINT.sum(position, item.point), point(dx, dy)), point(scale, scale))
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
        position = POINT.sum(position, item.point)
        path.lineTo(position.x, position.y)
        continue
      case 'l':
        position = POINT.sum(position, item.point)
        path.lineTo(item.point.x, item.point.y)
        continue
      case 'Z':
      case 'z':
        path.closePath()
        continue
    }
  }
  return path
}
