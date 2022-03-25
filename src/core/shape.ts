import { LineOptions } from './line-options'
import Orderable from './orderable'
import { Path2DBase } from './path2d/path2d-base'
import { Point } from './point'
import { Rect } from './rect'
import { ShapeStyle } from './shape-style'
import { Size } from './size'
import { MutablePath2D } from './path2d/mutable-path2d'
import { Matrix2D } from './matrix'
import Context2DFactory from './canvas-rendering-context-2d-factory'
import { IsPointInPolygon4 } from './utils'
import { deepCopyFast } from '../tools/deep-copy'

export default class Shape implements Orderable {
  private p: Path2DBase | null = null
  private readonly mutablePath: MutablePath2D
  width: number = 0
  height: number = 0
  style: ShapeStyle
  name: string
  order: number
  after?: Orderable
  before?: Orderable

  constructor (path: MutablePath2D, order: number, style: ShapeStyle | null = null) {
    this.mutablePath = path
    this.order = order
    this.style = style || {}
    this.name = 'shape'
  }

  rect (rect: Rect): this | Shape {
    this.mutablePath.rect(rect.x, rect.y, rect.width, rect.height)
    return this
  }

  moveTo (point: Point): this | Shape {
    this.mutablePath.moveTo(point.x, point.y)
    return this
  }

  lineTo (point: Point): this | Shape {
    this.mutablePath.lineTo(point.x, point.y)
    return this
  }

  lineH (point: Point, width: number): this | Shape {
    this.moveTo(point).lineTo(new Point(point.x + width, point.y))
    return this
  }

  lineV (point: Point, height: number): this | Shape {
    this.moveTo(point).lineTo(new Point(point.x, point.y + height))
    return this
  }

  arc (point: Point, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this | Shape {
    this.mutablePath.arc(point.x, point.y, radius, startAngle, endAngle, anticlockwise)
    return this
  }

  ellipse (point: Point, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this | Shape {
    this.mutablePath.ellipse(point.x, point.y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
    return this
  }

  polyline (points: Point[]): this | Shape {
    for (const point of points) {
      this.lineTo(point)
      this.moveTo(point)
    }
    return this
  }

  line (pointStart: Point, pointEnd: Point, options?: LineOptions): this | Shape {
    this.moveTo(pointStart)
    this.lineTo(pointEnd)

    if (!options || !options.arrow) return this
    // const a = alfa(pointStart, pointEnd)

    if (options.arrow.endTip) {
      // const point = this.getPoint(pointEnd)
      // arrow(this.transformationObject, point, a, options.arrow.endTip.length || 10, options.arrow.endTip.dir || 1)
    }

    if (options.arrow.startTip) {
      const point = pointStart
      this.moveTo(point)
      // arrow(this.transformationObject, point, a, options.arrow.startTip.length || 10, options.arrow.startTip.dir || -1)
    }
    return this
  }

  closePath (): this | Shape {
    this.mutablePath.closePath()
    return this
  }

  moveToR (point: Point): this | Shape {
    this.mutablePath.moveToR(point.x, point.y)
    return this
  }

  arcR (radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this | Shape {
    this.mutablePath.arcR(radius, startAngle, endAngle, anticlockwise)
    return this
  }

  ellipseR (radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this | Shape {
    this.mutablePath.ellipseR(radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
    return this
  }

  lineR (point: Point): this | Shape {
    this.mutablePath.moveToR(point.x, point.y)
    return this
  }

  rectR (size: Size): this | Shape {
    this.mutablePath.rectR(size.width, size.height)
    return this
  }

  merge (shape: Shape) {
    this.mutablePath.addPath(shape.toPath2D())
  }

  move (point: Point) {
    // const matrix = Matrix2D.identity
    // matrix.e = point.x
    // matrix.f = point.y
    this.mutablePath.transform.e = point.x
    this.mutablePath.transform.f = point.y
    // this.mutablePath.transform.mul(matrix)
  }

  scale (point: Point) {
    const matrix = Matrix2D.identity.scale(point)
    this.mutablePath.transform.mul(matrix)
  }

  flipY () {
    const matrix = Matrix2D.identity
    matrix.d = -1
    this.mutablePath.transform.mul(matrix)
  }

  inPath (p: Point): boolean {
    return IsPointInPolygon4(this.mutablePath.toPoints(), p)
  }

  inStroke (p: Point): boolean {
    return Context2DFactory.default.ctx.isPointInStroke(this.toPath2D(), p.x, p.y)
  }

  get bounds (): Rect {
    const point = this.mutablePath.toPoints()
    const xList = point.map(p => p.x)
    const yList = point.map(p => p.y)
    const x = Math.min.apply(null, xList)
    const y = Math.min.apply(null, yList)
    const x1 = Math.max.apply(null, xList)
    const y1 = Math.max.apply(null, yList)
    return new Rect(x, y, x1 - x, y1 - y)
  }

  toPath2D (): Path2DBase {
    if (this.p) return this.p
    this.p = this.mutablePath.createPath2D()
    return this.p
  }

  copyPath () {
    return this.mutablePath.copy()
  }

  transformFrom (shape: Shape): void {
    this.importTransformation(shape.exportTransformation())
  }

  copyStyle (): ShapeStyle {
    return deepCopyFast(this.style)
  }

  private exportTransformation (): Matrix2D {
    return this.mutablePath.transform.copy()
  }

  private importTransformation (transform: Matrix2D): void {
    if (!transform) throw new Error('matrix is undefined')
    this.mutablePath.transform = transform.copy()
  }
}
