import { cubic } from '../geometry/bezier'
import { IPoint, Point } from '../geometry/point'

export class CubicBezier {
  x1: number
  y1: number
  x2: number
  y2: number
  private readonly p0: IPoint = Point.zero
  private readonly p3: IPoint = { x: 1, y: 1 }

  constructor (x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }

  calc (t: number): IPoint {
    return cubic(new Point(this.p0), new Point(this.x1, this.y1), new Point(this.x2, this.y2), new Point(this.p3), t)
  }

  static get ease () {
    return new CubicBezier(0.25, 0.1, 0.25, 1)
  }

  static get linear () {
    return new CubicBezier(0.0, 0.0, 1, 1)
  }

  static get easeIn () {
    return new CubicBezier(0.42, 0, 1, 1)
  }

  static get easeOut () {
    return new CubicBezier(0, 0, 0.58, 1)
  }

  static get easeInOut () {
    return new CubicBezier(0.42, 0, 0.58, 1)
  }
}
