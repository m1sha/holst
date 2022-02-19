export class Point {
  x: number
  y: number

  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  static sum (point1: Point, point2: Point): Point {
    return new Point(point1.x + point2.x, point1.y + point2.y)
  }

  static mul (point1: Point, point2: Point): Point {
    return new Point(point1.x * point2.x, point1.y * point2.y)
  }
}
