import { POINT, Point } from '../point'
import { point } from '../utils'

export function toPath2D (path2d?: Path2D, ratio?: Point, scale: number = 1, move: Point = { x: 0, y: 0 }): Path2D {
  const path = path2d || new Path2D()
  const dx = ratio ? ratio.x : 1
  const dy = ratio ? ratio.y : 1
  this.position = point(move.x, move.y)
  for (const item of this.items) {
    switch (item.type) {
      case 'M':
        this.position = POINT.mul(POINT.mul(item.point, point(dx, dy)), point(scale, scale))
        continue
      case 'm':
        this.position = POINT.mul(POINT.mul(POINT.sum(this.position, item.point), point(dx, dy)), point(scale, scale))
        continue
      case 'V':
        this.position.y = item.height * dy
        path.lineTo(this.position.x, this.position.y)
        continue
      case 'v': {
        path.moveTo(this.position.x, this.position.y)
        this.position.y += item.height * dy * scale
        path.lineTo(this.position.x, this.position.y)
        continue
      }
      case 'H':
        this.position.x = item.width * dx
        path.lineTo(this.position.x, this.position.y)
        continue
      case 'h': {
        path.moveTo(this.position.x, this.position.y)
        this.position.x += item.width * dx * scale
        path.lineTo(this.position.x, this.position.y)
        continue
      }
      case 'L':
        this.position = POINT.sum(this.position, item.point)
        path.lineTo(this.position.x, this.position.y)
        continue
      case 'l':
        this.position = POINT.sum(this.position, item.point)
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
