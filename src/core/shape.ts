import { Path2DBase } from './path2d/path2d-base'
import { Point, IPoint } from './geometry/point'
import { Rect, IRect } from './geometry/rect'
import { ShapeStyle, ShapeStyleImpl } from './styles/shape-style'
import { MutablePath2D } from './path2d/mutable-path2d'
import { Matrix2D } from './matrix'
import Context2DFactory from './render/canvas-rendering-context-2d-factory'
import { calcBounds } from '../utils/utils'
import { RelativeMutablePath2D } from './path2d/relative-mutable-path2d'
import { Corner4 } from './geometry/corner4'
import { IVector } from './geometry/vector'
import { Figures } from './figures'
import { Drawable, DrawableType } from './drawable'
import { Size } from './geometry/size'
import { Rasterizer } from './render/rasterizer'

export default class Shape extends Drawable {
  #cache: Path2DBase | null = null
  private readonly mutablePath: MutablePath2D
  readonly relative: RelativeMutablePath2D
  style: ShapeStyleImpl
  readonly figures: Figures

  constructor (path: MutablePath2D, order: number, style: ShapeStyle | null = null) {
    super(order)
    this.mutablePath = path
    this.figures = new Figures(this.mutablePath.recorder, { setModified: () => (this.modified = true) })
    this.relative = new RelativeMutablePath2D(this.mutablePath)
    this.style = new ShapeStyleImpl(style || {}, () => (this.modified = true))
  }

  get circles () {
    return this.figures.circles
  }

  get segmentedCircles () {
    return this.figures.segmentedCircles
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
    this.mutablePath.roundRect(x, y, width, height, [r.tl, r.tr, r.bl, r.br])
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
      this.mutablePath.circle(point.x, point.y, radius)
    }
    if (args.length === 3) {
      const [x, y, radius] = args
      this.mutablePath.circle(x, y, radius)
    }

    this.modified = true
    return this
  }

  segmentedCircle (x: number, y: number, radius: number, segmentCount: number, smooth: number): this | Shape {
    this.mutablePath.segmentedCircle(x, y, radius, segmentCount, smooth)
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

  /** @deprecated */
  merge (shape: Shape): this | Shape {
    this.mutablePath.addPath(shape.#cache!!)
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

  inPath (p: Point): boolean {
    if (!this.#cache) throw Error('Shape must be rendered before')
    return Context2DFactory.default.ctx.isPointInPath(this.#cache!!, p.x, p.y) // IsPointInPolygon4(this.mutablePath.toPoints(), p)
  }

  inStroke (p: IPoint): boolean {
    if (!this.#cache) throw Error('Shape must be rendered before')
    return Context2DFactory.default.ctx.isPointInStroke(this.#cache!!, p.x, p.y)
  }

  get bounds (): Rect {
    const points = this.mutablePath.toPoints(this.anchor || undefined)
    const rect = calcBounds(points)
    // if (this.anchor && this.anchor.container) {
    //   const b = getAnchorPoint(this.anchor)
    //   rect.x = b.x
    //   rect.y = b.y
    // }
    return rect
  }

  get originalBounds (): Rect {
    const points = this.mutablePath.toOriginalSizePoints(this.anchor || undefined)
    const rect = calcBounds(points)
    return rect
  }

  toPath2D (viewportMatrix: Matrix2D, forceRedraw: boolean = false): Path2DBase {
    const modified = this.anchor && this.anchor.isModified(this)
    if (this.modified || modified || forceRedraw) {
      this.#cache = this.mutablePath.createPath2D(this.frozen ? Matrix2D.identity : viewportMatrix, this.anchor || undefined)
      this.modified = false
      this.anchor && this.anchor.setUnmodified(this)
    }

    return this.#cache!!
  }

  rasterize () {
    return Rasterizer.rasterizeShape(this)
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
    this.update()
  }

  copyStyle (): ShapeStyle {
    return this.style.clone()
  }

  getType (): DrawableType {
    return 'shape'
  }

  rotateByCenter (angle: number) {
    this.update()
    return super.rotateByCenter(angle)
  }

  protected get transform (): Matrix2D {
    return this.mutablePath.transform
  }

  protected set transform (value: Matrix2D) {
    this.mutablePath.transform = value
    this.update()
  }

  private exportTransformation (): Matrix2D {
    return this.mutablePath.transform.copy()
  }

  private importTransformation (transform: Matrix2D): void {
    if (!transform) throw new Error('matrix is undefined')
    this.mutablePath.transform = transform.copy()
    this.update()
  }

  toString () {
    const figures = new Array(this.figures.count)
      .fill('')
      .map((_, i) => JSON.stringify(this.figures.get(i)))
      .join('; ')

    return `${this.name} ${figures}`
  }

  clone (): Shape {
    const result = Shape.create(this.copyStyle(), this.copyPath())
    result.setTransformFrom(this)
    return result
  }

  static create (style: ShapeStyle | null = null, path2d: MutablePath2D = new MutablePath2D()) {
    return new Shape(path2d ?? new MutablePath2D(), 0, style)
  }
}
