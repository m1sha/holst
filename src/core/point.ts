export class Point {
  x: number
  y: number

  constructor (point: { x: number; y: number })
  constructor (x: number, y: number)
  constructor (...args: Array<any>) {
    this.x = 0
    this.y = 0
    if (args.length === 1) {
      this.x = args[0].x
      this.y = args[0].y
    }
    if (args.length === 2) {
      this.x = args[0]
      this.y = args[1]
    }
  }

  add (point: Point) {
    return new Point(this.x + point.x, this.y + point.y)
  }

  dec (point: Point) {
    return new Point(this.x - point.x, this.y - point.y)
  }

  static sum (point1: Point, point2: Point): Point {
    return new Point(point1.x + point2.x, point1.y + point2.y)
  }

  static mul (point1: Point, point2: Point): Point {
    return new Point(point1.x * point2.x, point1.y * point2.y)
  }
}
