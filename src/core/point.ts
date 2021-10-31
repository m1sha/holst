import { point } from './utils'

export interface Point{
    x: number
    y: number
}

export class POINT {
  static sum (point1: Point, point2: Point): Point {
    return point(point1.x + point2.x, point1.y + point2.y)
  }
}
