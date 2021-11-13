import { Context2DOrientation } from './context2d'
import { Layer } from './layers'
import { LineOptions } from './line-options'
import Orderable from './orderable'
import { Point } from './point'
import { Rect } from './rect'
import { ShapeStyle } from './shape-style'
import { Size } from './size'
import { alfa, arrow } from './transform'

export default class Shape implements Orderable {
  private readonly location: Point
  private readonly originSize: Size
  private readonly orientation: Context2DOrientation
  private readonly path: Path2D
  style: ShapeStyle
  name: string
  order: number
  after?: Orderable
  before?: Orderable

  constructor (layer: Layer, path: Path2D, order: number, style: ShapeStyle = null) {
    this.location = layer.location
    this.originSize = layer.originSize
    this.orientation = layer.orientation
    this.path = path
    this.order = order
    this.style = style || {}
    this.name = 'shape'
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
    this.path.moveTo(point.x, point.y)
    return this
  }

  lineTo (point: Point): this | Shape {
    point = this.getPoint(point)
    this.path.lineTo(point.x, point.y)
    return this
  }

  lineH (point: Point, width: number): this | Shape {
    this.moveTo(point).lineTo({ x: point.x + width, y: point.y })
    return this
  }

  lineV (point: Point, height: number): this | Shape {
    this.moveTo(point).lineTo({ x: point.x, y: point.y + height })
    return this
  }

  arc (point: Point, radius: number, startAngle: number, endAngle, anticlockwise?: boolean) {
    point = this.getPoint(point)
    this.path.arc(point.x, point.y, radius, startAngle, endAngle, anticlockwise)
  }

  ellipse (point: Point, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle, anticlockwise?: boolean) {
    point = this.getPoint(point)
    this.path.ellipse(point.x, point.y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
  }

  polyline (points: Point[]) {
    for (const point of points) {
      this.lineTo(point)
      this.moveTo(point)
    }
  }

  line (pointStart: Point, pointEnd: Point, options?: LineOptions) {
    this.moveTo(pointStart)
    this.lineTo(pointEnd)

    if (!options || !options.arrow) return
    const a = alfa(pointStart, pointEnd)

    if (options.arrow.endTip) {
      const point = this.getPoint(pointEnd)
      arrow(this.path, point, a, options.arrow.endTip.length || 10, options.arrow.endTip.dir || 1)
    }

    if (options.arrow.startTip) {
      const point = this.getPoint(pointStart)
      this.moveTo(point)
      arrow(this.path, point, a, options.arrow.startTip.length || 10, options.arrow.startTip.dir || -1)
    }
  }

  closePath () {
    this.path.closePath()
  }

  merge (shape: Shape) {
    this.path.addPath(shape.getPath())
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
