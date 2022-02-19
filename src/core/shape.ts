import { Context2DOrientation } from './renderer2D'
import { Layer } from './layers'
import { LineOptions } from './line-options'
import Orderable from './orderable'
import { Path2DBase } from './path2d-base'
import { Point } from './point'
import { Rect } from './rect'
import { ShapeStyle } from './shape-style'
import { Size } from './size'
import { TransformationPath } from './transformation-path'
import { Matrix2D } from './matrix'

export default class Shape implements Orderable {
  /**
  * @deprecated The method should not be used. Use property position
  */
  private readonly location: Point
  private readonly originSize: Size
  private readonly orientation: Context2DOrientation
  private readonly transformationObject: TransformationPath
  readonly position: Point
  // readonly scale: Point
  width: number = 0
  height: number = 0
  style: ShapeStyle
  name: string
  order: number
  after?: Orderable
  before?: Orderable

  constructor (layer: Layer, transformationObject: TransformationPath, order: number, style: ShapeStyle | null = null) {
    this.location = layer.location
    this.originSize = layer.originSize
    this.orientation = layer.orientation
    this.transformationObject = transformationObject
    this.order = order
    this.style = style || {}
    this.name = 'shape'
    this.width = layer.size.width
    this.height = layer.size.height
    const self = this
    this.position = {
      get x (): number {
        return self.transformationObject.transform.e
      },
      set x (value: number) {
        self.transformationObject.transform.e = value
      },
      get y (): number {
        return self.transformationObject.transform.f
      },
      set y (value: number) {
        self.transformationObject.transform.f = value
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
    this.transformationObject.rect(point.x, point.y, width, height)
    return this
  }

  moveTo (point: Point): this | Shape {
    point = this.getPoint(point)
    this.transformationObject.moveTo(point.x, point.y)
    return this
  }

  lineTo (point: Point): this | Shape {
    point = this.getPoint(point)
    this.transformationObject.lineTo(point.x, point.y)
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
    this.transformationObject.arc(point.x, point.y, radius, startAngle, endAngle, anticlockwise)
  }

  ellipse (point: Point, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean) {
    point = this.getPoint(point)
    this.transformationObject.ellipse(point.x, point.y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
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
    this.transformationObject.closePath()
  }

  merge (shape: Shape) {
    this.transformationObject.addPath(shape.createPath())
  }

  move (point: Point) {
    const matrix = Matrix2D.identity
    matrix.e = point.x
    matrix.f = point.y
    this.transformationObject.transform.mul(matrix) // = MATRIX.mul(this.transformationObject.transform, matrix)
  }

  scale (point: Point) {
    const matrix = Matrix2D.identity.scale(point)
    this.transformationObject.transform.mul(matrix) // = MATRIX.mul(this.transformationObject.transform, matrix)
  }

  flipY () {
    const matrix = Matrix2D.identity
    matrix.d = -1
    this.transformationObject.transform.mul(matrix) // = MATRIX.mul(this.transformationObject.transform, matrix)
  }

  get bounds (): Rect {
    const point = this.transformationObject.toPoints()
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

  createPath (): Path2DBase {
    return this.transformationObject.createPath2D()
  }
}
