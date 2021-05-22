import { Context2DOrientation } from './context2d'
import { Point } from './point'
import { Rect } from './rect'
import { ShapeStyle } from './shape-style'
import { Size } from './size'

export default class Shape {
  private readonly location: Point
  private readonly layerSize: Size
  private readonly originSize: Size
  private readonly orientation: Context2DOrientation
  private readonly ratio: Point
  private readonly path: Path2D
  readonly style: ShapeStyle

  constructor ({ location, size, originSize, orientation, ratio }) {
    this.location = location
    this.layerSize = size
    this.originSize = originSize
    this.orientation = orientation
    this.ratio = ratio
    this.path = new Path2D()
    this.style = {}
  }

  rect (rect: Rect): this | Shape {
    const point = this.getPoint(rect)
    const height = this.orientation === 'top-left' ? rect.height : -rect.height
    const width = rect.width
    this.path.rect(point.x, point.y, width, height)
    return this
  }

  moveTo (point: Point): this | Shape {
    point = this.getPoint(point)
    this.path.moveTo(point.x + this.location.x, point.y - this.location.y)
    return this
  }

  lineTo (point: Point): this | Shape {
    point = this.getPoint(point)
    this.path.lineTo(point.x + this.location.x, point.y - this.location.y)
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

  arc (point: Point, radius: number, startAngle: number, endAngle, anticlockwise?: boolean) {
    point = this.getPoint(point)
    this.path.arc(point.x, point.y, radius, startAngle, endAngle, anticlockwise)
  }

  private getPoint (point: Point) : Point {
    const isTopLeft = this.orientation === 'top-left'
    return {
      x: this.location.x + point.x,
      y: isTopLeft ? point.y + this.location.y : (this.originSize.height - point.y) - this.location.y
    }
  }

  /** @internal */
  getPath () { return this.path }
}
