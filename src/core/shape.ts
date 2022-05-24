import { LineOptions } from './line-options'
import Orderable from './orderable'
import { Path2DBase } from './path2d/path2d-base'
import { Point, IPoint } from './point'
import { Rect, IRect } from './rect'
import { ShapeStyle, ShapeStyleImpl } from './shape-style'
import { MutablePath2D } from './path2d/mutable-path2d'
import { Matrix2D } from './matrix'
import Context2DFactory from './canvas-rendering-context-2d-factory'
import { calcBounds /*, IsPointInPolygon4 */ } from './utils'
import { RelativeMutablePath2D } from './path2d/relative-mutable-path2d'
import { EventType, Interactive } from './events/interactive'
import { EventHandlerBag, IEventHandler } from './events/event-handler2'
import { uid } from '../tools/uid'

export default class Shape implements Interactive, Orderable {
  #modified: boolean = true
  #cache: Path2DBase | null = null
  private readonly mutablePath: MutablePath2D
  readonly id: string
  readonly relative: RelativeMutablePath2D
  style: ShapeStyleImpl
  name: string
  order: number
  /** @internal */ eventHandler: IEventHandler = new EventHandlerBag()
  frozen: boolean = false

  constructor (path: MutablePath2D, order: number, style: ShapeStyle | null = null) {
    this.id = uid()
    this.mutablePath = path
    this.relative = new RelativeMutablePath2D(this.mutablePath)
    this.order = order
    this.style = new ShapeStyleImpl(style || {}, () => (this.#modified = true))
    this.name = 'shape'
  }

  rect (rect: IRect): this | Shape {
    this.mutablePath.rect(rect.x, rect.y, rect.width, rect.height)
    this.#modified = true
    return this
  }

  roundRect (rect: IRect, radius: number | { tl: number; tr: number; bl: number; br: number }): this | Shape {
    const { x, y, width, height } = rect
    const r = typeof radius === 'number' ? { tl: radius, tr: radius, bl: radius, br: radius } : radius
    this.moveTo({ x: x + r.tl, y }) // radius.tl
    this.lineTo({ x: x + width - r.tr, y }) // radius.tr
    this.quadraticCurveTo({ x: x + width, y }, { x: x + width, y: y + r.tr }) // radius.tr
    this.lineTo({ x: x + width, y: y + height - r.br }) // radius.br
    this.quadraticCurveTo({ x: x + width, y: y + height }, { x: x + width - r.br, y: y + height }) // radius.br
    this.lineTo({ x: x + r.bl, y: y + height }) // radius.bl
    this.quadraticCurveTo({ x, y: y + height }, { x, y: y + height - r.bl }) // radius.bl
    this.lineTo({ x, y: y + r.tl }) // radius.tl
    this.quadraticCurveTo({ x, y }, { x: x + r.tl, y }) //  radius.tl
    this.closePath()
    this.#modified = true
    return this
  }

  moveTo (point: IPoint): this | Shape {
    this.mutablePath.moveTo(point.x, point.y)
    this.#modified = true
    return this
  }

  lineTo (point: IPoint): this | Shape {
    this.mutablePath.lineTo(point.x, point.y)
    this.#modified = true
    return this
  }

  lineH (point: IPoint, width: number): this | Shape {
    this.moveTo(point).lineTo(new Point(point.x + width, point.y))
    this.#modified = true
    return this
  }

  lineV (point: IPoint, height: number): this | Shape {
    this.moveTo(point).lineTo(new Point(point.x, point.y + height))
    this.#modified = true
    return this
  }

  arc (point: IPoint, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this | Shape {
    if (startAngle === 0) this.mutablePath.moveTo(point.x + radius, point.y + radius)
    this.mutablePath.arc(point.x, point.y, radius, startAngle, endAngle, anticlockwise)
    this.#modified = true
    return this
  }

  ellipse (point: IPoint, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this | Shape {
    if (startAngle === 0) this.mutablePath.moveTo(point.x + radiusX, point.y + radiusY)
    this.mutablePath.ellipse(point.x, point.y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
    this.#modified = true
    return this
  }

  circle (point: IPoint, radius: number): this | Shape {
    return this.ellipse(point, radius, radius, 0, 0, Math.PI * 2)
  }

  quadraticCurveTo (cp: IPoint, p: IPoint): this | Shape {
    this.mutablePath.quadraticCurveTo(cp.x, cp.y, p.x, p.y)
    this.#modified = true
    return this
  }

  polyline (points: IPoint[]): this | Shape {
    for (const point of points) {
      this.lineTo(point)
      this.moveTo(point)
    }
    this.#modified = true
    return this
  }

  line (pointStart: IPoint, pointEnd: IPoint, options?: LineOptions): this | Shape {
    this.moveTo(pointStart)
    this.lineTo(pointEnd)
    this.#modified = true
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
    this.#modified = true
    return this
  }

  merge (shape: Shape): this | Shape {
    this.mutablePath.addPath(shape.toPath2D())
    this.#modified = true
    return this
  }

  move (point: IPoint): this | Shape {
    // const matrix = Matrix2D.identity
    // matrix.e = point.x
    // matrix.f = point.y
    this.mutablePath.transform.e = point.x
    this.mutablePath.transform.f = point.y
    // this.mutablePath.transform.mul(matrix)
    this.#modified = true
    return this
  }

  get shift (): Point {
    return new Point(this.mutablePath.transform.e, this.mutablePath.transform.f)
  }

  scale (point: IPoint): this | Shape {
    // const matrix = Matrix2D.identity.scale(point)
    // this.mutablePath.transform.mul(matrix)
    this.mutablePath.transform.a = point.x
    this.mutablePath.transform.d = point.y
    this.#modified = true
    return this
  }

  flipY (): this | Shape {
    const matrix = Matrix2D.identity
    matrix.d = -1
    this.mutablePath.transform.mul(matrix)
    this.#modified = true
    return this
  }

  inPath (p: Point): boolean {
    return Context2DFactory.default.ctx.isPointInPath(this.toPath2D(), p.x, p.y) // IsPointInPolygon4(this.mutablePath.toPoints(), p)
  }

  inStroke (p: IPoint): boolean {
    return Context2DFactory.default.ctx.isPointInStroke(this.toPath2D(), p.x, p.y)
  }

  get bounds (): Rect {
    const points = this.mutablePath.toPoints()
    return calcBounds(points)
  }

  toPath2D (globalTransform?: Matrix2D): Path2DBase {
    if (this.#modified) {
      this.#cache = this.mutablePath.createPath2D(this.frozen ? Matrix2D.identity : globalTransform)
      this.#modified = false
    }

    return this.#cache!!
  }

  copyPath () {
    return this.mutablePath.copy()
  }

  setTransformFrom (shape: Shape): void {
    this.importTransformation(shape.exportTransformation())
  }

  copyStyle (): ShapeStyle {
    return this.style.clone()
  }

  get modified (): boolean {
    return this.#modified
  }

  private exportTransformation (): Matrix2D {
    return this.mutablePath.transform.copy()
  }

  private importTransformation (transform: Matrix2D): void {
    if (!transform) throw new Error('matrix is undefined')
    this.mutablePath.transform = transform.copy()
    this.#modified = true
  }

  on<K extends keyof EventType> (type: K, listener: (ev: EventType[K]) => void): this | Shape {
    this.eventHandler.add(this, type, listener)
    return this
  }

  off<K extends keyof EventType> (type: K): this | Shape {
    this.eventHandler.remove(this, type)
    return this
  }
}
