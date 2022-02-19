import { Context2DOrientation } from './renderer2D'
import { Point } from './point'
import { Size } from './size'

export class Coords {
  static getScreenOrientation (point: Point, size: Size, orientation: Context2DOrientation): Point {
    let x, y
    const o = orientation.split('-')
    if (o[0] === 'top') {
      y = point.y
    }
    if (o[0] === 'bottom') {
      y = size.height - point.y
    }
    if (o[1] === 'left') {
      x = point.x
    }
    if (o[1] === 'right') {
      x = size.width - point.x
    }
    return new Point(x, y)
  }
}
