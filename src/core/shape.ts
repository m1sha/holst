import Orderable from './orderable'
import { Path2DBase } from './path2d/path2d-base'
import { Point, IPoint } from './point'
import { Rect, IRect } from './rect'
import { ShapeStyle, ShapeStyleImpl } from './shape-style'
import { MutablePath2D } from './path2d/mutable-path2d'
import { Matrix2D } from './matrix'
import Context2DFactory from './render/canvas-rendering-context-2d-factory'
import { calcBounds } from '../utils/utils'
import { RelativeMutablePath2D } from './path2d/relative-mutable-path2d'
import { EventType, Interactive } from './events/interactive'
import { EventHandlerBag, IEventHandler } from './events/event-handler2'
import { uid } from '../utils/uid'
import { Corner4 } from './corner4'
import { IVector } from './vector'
import { Figures } from './figures'
import { Drawable, DrawableType } from './drawable'
import { Shadow } from './shadow'
import { Container } from './container'
import { Size } from './size'

export default class Shape extends Container implements Interactive, Orderable, Drawable {
  #modified: boolean = true
  #cache: Path2DBase | null = null
  private readonly mutablePath: MutablePath2D
  readonly id: string
  readonly relative: RelativeMutablePath2D
  type: DrawableType = 'shape'
  style: ShapeStyleImpl
  name: string
  order: number
  /** @internal */ eventHandler: IEventHandler = new EventHandlerBag()
  /** @internal */ globalTransform: Matrix2D | null = null
  frozen: boolean = false
  readonly figures: Figures
  readonly shadow: Shadow = new Shadow()
  hidden: boolean = false
  onModified: (() => void) | null = null

  constructor (path: MutablePath2D, order: number, style: ShapeStyle | null = null) {
    super()
    this.id = uid()
    this.mutablePath = path
    this.figures = new Figures(this.mutablePath.recorder, { setModified: () => (this.modified = true) })
    this.relative = new RelativeMutablePath2D(this.mutablePath)
    this.order = order
    this.style = new ShapeStyleImpl(style || {}, () => (this.modified = true))
    this.name = 'shape'
  }

  get circles () {
    return this.figures.circles
  }

  get ellipses () {
    return this.figures.ellipses
  }

  get arcs () {
    return this.figures.arcs
  }

  get arcTos () {
    return this.figures.arcTos
  }

  get moveTos () {
    return this.figures.moveTos
  }

  get lineTos () {
    return this.figures.lineTos
  }

  get lines () {
    return this.figures.lineTos
  }

  get rects () {
    return this.figures.rects
  }

  get roundRects () {
    return this.figures.roundRects
  }

  bezierCurveTos () {
    return this.figures.bezierCurveTos
  }

  get quadraticCurveTos () {
    return this.figures.quadraticCurveTos
  }

  get arrows () {
    return this.figures.arrows
  }

  rect (x: number, y: number, width: number, height: number): this | Shape
  // eslint-disable-next-line no-dupe-class-members
  rect (point: IPoint, size: Size): this | Shape
  // eslint-disable-next-line no-dupe-class-members
  rect (rect: IRect): this | Shape
  // eslint-disable-next-line no-dupe-class-members
  rect (...args: Array<any>): this | Shape {
    if (args.length === 1) {
      const [rect] = args
      this.mutablePath.rect(rect.x, rect.y, rect.width, rect.height)
    }

    if (args.length === 2) {
      const [point, size] = args
      this.mutablePath.rect(point.x, point.y, size.width, size.height)
    }

    if (args.length === 4) {
      const [x, y, width, height] = args
      this.mutablePath.rect(x, y, width, height)
    }

    this.modified = true
    return this
  }

  roundRect (rect: IRect, radius: number | Corner4): this | Shape {
    const { x, y, width, height } = rect
    const r = typeof radius === 'number' ? { tl: radius, tr: radius, bl: radius, br: radius } : radius
    this.mutablePath.roundRect(x, y, width, height, r.tl, r.tr, r.bl, r.br)
    this.modified = true
    return this
  }

  moveTo (point: IPoint): this | Shape {
    this.mutablePath.moveTo(point.x, point.y)
    this.modified = true
    return this
  }

  lineTo (point: IPoint): this | Shape {
    this.mutablePath.lineTo(point.x, point.y)
    this.modified = true
    return this
  }

  lineH (point: IPoint, width: number): this | Shape {
    this.moveTo(point).lineTo(new Point(point.x + width, point.y))
    this.modified = true
    return this
  }

  lineV (point: IPoint, height: number): this | Shape {
    this.moveTo(point).lineTo(new Point(point.x, point.y + height))
    this.modified = true
    return this
  }

  arc (point: IPoint, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this | Shape {
    if (startAngle === 0) this.mutablePath.moveTo(point.x + radius, point.y + radius)
    this.mutablePath.arc(point.x, point.y, radius, startAngle, endAngle, anticlockwise)
    this.modified = true
    return this
  }

  ellipse (point: IPoint, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this | Shape {
    if (startAngle === 0) this.mutablePath.moveTo(point.x + radiusX, point.y + radiusY)
    this.mutablePath.ellipse(point.x, point.y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
    this.modified = true
    return this
  }

  circle (x: number, y: number, radius: number): this | Shape
  // eslint-disable-next-line no-dupe-class-members
  circle (point: IPoint, radius: number): this | Shape
  // eslint-disable-next-line no-dupe-class-members
  circle (...args: Array<any>): this | Shape {
    if (args.length === 2) {
      const [point, radius] = args
      this.mutablePath.moveTo(point.x + radius, point.y + radius)
      this.mutablePath.circle(point.x, point.y, radius)
    }
    if (args.length === 3) {
      const [x, y, radius] = args
      this.mutablePath.moveTo(x + radius, y + radius)
      this.mutablePath.circle(x, y, radius)
    }

    this.modified = true
    return this
  }

  bezierCurveTo (cp1: IPoint, cp2: IPoint, p: IPoint): this | Shape {
    this.mutablePath.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p.x, p.y)
    this.modified = true
    return this
  }

  quadraticCurveTo (cp: IPoint, p: IPoint): this | Shape {
    this.mutablePath.quadraticCurveTo(cp.x, cp.y, p.x, p.y)
    this.modified = true
    return this
  }

  polyline (points: IPoint[]): this | Shape {
    this.mutablePath.polygon(points)
    this.modified = true
    return this
  }

  line (pointStart: IPoint, pointEnd: IPoint): this | Shape {
    this.moveTo(pointStart)
    this.lineTo(pointEnd)
    this.modified = true
    return this
  }

  arrow (vector: IVector, length: number, direction: '>' | '<'): this | Shape {
    const { sp, ep } = vector
    this.mutablePath.arrow(sp.x, sp.y, ep.x, ep.y, length, direction)
    this.modified = true
    return this
  }

  closePath (): this | Shape {
    this.mutablePath.closePath()
    this.modified = true
    return this
  }

  merge (shape: Shape): this | Shape {
    this.mutablePath.addPath(shape.toPath2D())
    this.modified = true
    return this
  }

  move (point: IPoint): this | Shape {
    this.mutablePath.transform.e = point.x
    this.mutablePath.transform.f = point.y
    this.modified = true
    return this
  }

  get shift (): Point {
    return new Point(this.mutablePath.transform.e, this.mutablePath.transform.f)
  }

  scale (point: IPoint): this | Shape {
    this.mutablePath.transform.a = point.x
    this.mutablePath.transform.d = point.y
    this.modified = true
    return this
  }

  rotate (angle: number): this | Shape {
    this.modified = true
    this.mutablePath.transform.b = Math.sin(angle)
    this.mutablePath.transform.c = -Math.cos(angle)
    return this
  }

  flipY (): this | Shape {
    const matrix = Matrix2D.identity
    matrix.d = -1
    this.mutablePath.transform.mul(matrix)
    this.modified = true
    return this
  }

  inPath (p: Point): boolean {
    return Context2DFactory.default.ctx.isPointInPath(this.toPath2D(), p.x, p.y) // IsPointInPolygon4(this.mutablePath.toPoints(), p)
  }

  inStroke (p: IPoint): boolean {
    return Context2DFactory.default.ctx.isPointInStroke(this.toPath2D(), p.x, p.y)
  }

  get bounds (): Rect {
    const points = this.mutablePath.toPoints(this.frozen ? Matrix2D.identity : this.globalTransform ?? Matrix2D.identity, this.anchor || undefined)
    const rect = calcBounds(points)
    // if (this.anchor && this.anchor.container) {
    //   const b = getAnchorPoint(this.anchor)
    //   rect.x = b.x
    //   rect.y = b.y
    // }
    return rect
  }

  toPath2D (): Path2DBase {
    const modified = this.anchor && this.anchor.isModified(this)
    if (this.#modified || modified) {
      this.#cache = this.mutablePath.createPath2D(this.frozen ? Matrix2D.identity : this.globalTransform ?? Matrix2D.identity, this.anchor || undefined)
      this.modified = false
      this.anchor && this.anchor.setUnmodified(this)
    }

    return this.#cache!!
  }

  copyPath () {
    return this.mutablePath.copy()
  }

  setTransformFrom (shape: Shape): void {
    this.importTransformation(shape.exportTransformation())
  }

  // Method for matrix test. Don't use directly
  injectTransform (transform: Matrix2D) {
    if (!transform) throw new Error('matrix is undefined')
    this.mutablePath.transform = transform.copy()
    this.#modified = true
  }

  copyStyle (): ShapeStyle {
    return this.style.clone()
  }

  get modified (): boolean {
    return this.#modified
  }

  set modified (value: boolean) {
    this.#modified = value
    if (value && this.onModified) this.onModified()
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

  /** @internal */
  update (): void {
    this.#modified = true
  }

  toString () {
    const figures = new Array(this.figures.count)
      .fill('')
      .map((_, i) => JSON.stringify(this.figures.get(i)))
      .join('; ')

    return `${this.name} ${figures}`
  }

  static create (style: ShapeStyle | null = null, path2d: MutablePath2D = new MutablePath2D()) {
    return new Shape(path2d ?? new MutablePath2D(), 0, style)
  }
}
