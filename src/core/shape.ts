import { Point } from './point'
import { Rect } from './rect'
import { ShapeStyle } from './shape-style'

export default class Shape {
  private readonly path: Path2D
  readonly style: ShapeStyle

  constructor () {
    this.path = new Path2D()
    this.style = {}
  }

  rect (rect: Rect): this | Shape {
    this.path.rect(rect.x, rect.y, rect.width, rect.height)
    return this
  }

  moveTo (point: Point): this | Shape {
    this.path.moveTo(point.x, point.y)
    return this
  }

  lineTo (point: Point): this | Shape {
    this.path.lineTo(point.x, point.y)
    return this
  }

  lineH (point: Point, width: number): this | Shape {
    this
      .moveTo(point)
      .lineTo({ x: point.x + width, y: point.y })
    return this
  }

  lineV (point: Point, height: number): this | Shape {
    this
      .moveTo(point)
      .lineTo({ x: point.x, y: point.y + height })
    return this
  }

  /** @internal */
  getPath () { return this.path }
}
