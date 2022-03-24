import { Context2DOrientation } from './renderer2D'
import { Layer } from './layers'
import { LineOptions } from './line-options'
import Orderable from './orderable'
import { Path2DBase } from './path2d-base'
import { Point } from './point'
import { Rect } from './rect'
import { ShapeStyle } from './shape-style'
import { Size } from './size'
import { MutablePath2D } from './mutable-path2d'
import { Matrix2D } from './matrix'
import Context2DFactory from './canvas-rendering-context-2d-factory'
import { IsPointInPolygon4 } from './utils'
import { deepCopyFast } from '../tools/deep-copy'

export default class Shape implements Orderable {
  private p: Path2DBase | null = null
  /**
  * @deprecated The method should not be used. Use property position
  */
  private readonly location: Point
  private readonly originSize: Size
  private readonly orientation: Context2DOrientation
  private readonly mutablePath: MutablePath2D
  readonly position: Point
  // readonly scale: Point
  width: number = 0
  height: number = 0
  style: ShapeStyle
  name: string
  order: number
  after?: Orderable
  before?: Orderable

  constructor (layer: Layer, path: MutablePath2D, order: number, style: ShapeStyle | null = null) {
    this.location = layer.location
    this.originSize = layer.originSize
    this.orientation = layer.orientation
    this.mutablePath = path
    this.order = order
    this.style = style || {}
    this.name = 'shape'
    this.width = layer.size.width
    this.height = layer.size.height
    const self = this
    this.position = {
      get x (): number {
        return self.mutablePath.transform.e
      },
      set x (value: number) {
        self.mutablePath.transform.e = value
      },
      get y (): number {
        return self.mutablePath.transform.f
      },
      set y (value: number) {
        self.mutablePath.transform.f = value
      }
    }
    // this.scale = {
    //   get x (): number {
    //     return self.transformationObject.transform.a
    //   },
    //   set x (value: number) {
    //     self.transformationObject.transform.a = value
    //   },
    //   get y (): number {
    //     return self.transformationObject.transform.d
    //   },
    //   set y (value: number) {
    //     self.transformationObject.transform.d = value
    //   }
    // }
  }

  rect (rect: Rect): this | Shape {
    const point = this.getPoint(rect)
    const height = this.orientation === 'top-left' ? rect.height : -rect.height
    const width = rect.width
    this.mutablePath.rect(point.x, point.y, width, height)
    return this
  }

  moveTo (point: Point): this | Shape {
    point = this.getPoint(point)
    this.mutablePath.moveTo(point.x, point.y)
    return this
  }

  lineTo (point: Point): this | Shape {
    point = this.getPoint(point)
    this.mutablePath.lineTo(point.x, point.y)
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

  arc (point: Point, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean) {
    point = this.getPoint(point)
    this.mutablePath.arc(point.x, point.y, radius, startAngle, endAngle, anticlockwise)
  }

  ellipse (point: Point, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean) {
    point = this.getPoint(point)
    this.mutablePath.ellipse(point.x, point.y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
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
    // const a = alfa(pointStart, pointEnd)

    if (options.arrow.endTip) {
      // const point = this.getPoint(pointEnd)
      // arrow(this.transformationObject, point, a, options.arrow.endTip.length || 10, options.arrow.endTip.dir || 1)
    }

    if (options.arrow.startTip) {
      const point = this.getPoint(pointStart)
      this.moveTo(point)
      // arrow(this.transformationObject, point, a, options.arrow.startTip.length || 10, options.arrow.startTip.dir || -1)
    }
  }

  closePath () {
    this.mutablePath.closePath()
  }

  moveToR (point: Point): this | Shape {
    point = this.getPoint(point)
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
    const matrix = Matrix2D.identity
    matrix.e = point.x
    matrix.f = point.y
    this.mutablePath.transform.mul(matrix) // = MATRIX.mul(this.transformationObject.transform, matrix)
  }

  scale (point: Point) {
    const matrix = Matrix2D.identity.scale(point)
    this.mutablePath.transform.mul(matrix) // = MATRIX.mul(this.transformationObject.transform, matrix)
  }

  flipY () {
    const matrix = Matrix2D.identity
    matrix.d = -1
    this.mutablePath.transform.mul(matrix) // = MATRIX.mul(this.transformationObject.transform, matrix)
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

  private getPoint (point: Point) : Point {
    const isTopLeft = this.orientation === 'top-left'
    return new Point(
      this.location.x + point.x,
      isTopLeft ? point.y + this.location.y : (this.originSize.height - point.y) - this.location.y
    )
  }

  toPath2D (): Path2DBase {
    if (this.p) return this.p
    this.p = this.mutablePath.createPath2D()
    return this.p
  }

  copyPath () {
    return this.mutablePath.copy()
  }

  private exportTransformation (): Matrix2D {
    return this.mutablePath.transform.copy()
  }

  private importTransformation (transform: Matrix2D): void {
    if (!transform) throw new Error('matrix is undefined')
    this.mutablePath.transform = transform.copy()
  }

  transformFrom (shape: Shape): void {
    this.importTransformation(shape.exportTransformation())
  }

  copyStyle (): ShapeStyle {
    return deepCopyFast(this.style)
  }
}
