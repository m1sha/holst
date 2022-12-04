import { Drawable, DrawableType } from './drawable'
import { Arc } from './figures/arc'
import { Circle } from './figures/circle'
import { Ellipse } from './figures/ellipse'
import { FigureStack } from './figures/figure-stack'
import { Line } from './figures/line'
import { Rectangle } from './figures/rectangle'
import { Corner4 } from './geometry/corner4'
import { IPoint, Point } from './geometry/point'
import { Rect, IRect } from './geometry/rect'
import { Size } from './geometry/size'
import { Matrix2D } from './matrix'
import { Path2DBase } from './path2d/path2d-base'
import Context2DFactory from './render/canvas-rendering-context-2d-factory'
import { Shadow } from './styles/shadow'
import { ShapeStyle, ShapeStyleImpl } from './styles/shape-style'

export class Shape2 extends Drawable {
  #transform: Matrix2D = Matrix2D.identity
  #figureStack: FigureStack
  style: ShapeStyleImpl
  readonly shadow: Shadow = new Shadow()

  constructor (order: number, style: ShapeStyle | null = null) {
    super(order)
    this.#figureStack = new FigureStack()
    this.style = new ShapeStyleImpl(style || {}, () => (this.modified = true))
  }

  rect (x: number, y: number, width: number, height: number, corners?: Corner4 | number): this | Shape2
  // eslint-disable-next-line no-dupe-class-members
  rect (point: IPoint, size: Size, corners?: Corner4 | number): this | Shape2
  // eslint-disable-next-line no-dupe-class-members
  rect (rect: IRect, corners?: Corner4 | number): this | Shape2
  // eslint-disable-next-line no-dupe-class-members
  rect (...args: Array<any>): this | Shape2 {
    let figure: Rectangle | null = null
    if (
      (args.length === 1 && typeof args[0] === 'object' && Object.hasOwn(args[0], 'width')) ||
      (args.length === 2 && (typeof args[1] === 'number' || (typeof args[1] === 'object' && !Object.hasOwn(args[0], 'width'))))
    ) {
      figure = new Rectangle(args[0], args[1])
    }
    if (
      (args.length === 2 && typeof args[0] === 'object' && !Object.hasOwn(args[0], 'width') && typeof args[1] === 'object' && Object.hasOwn(args[1], 'width')) ||
      args.length === 3
    ) {
      const rect: IRect = { ...args[0], ...args[1] }
      figure = new Rectangle(rect, args[2])
    }
    if (args.length === 4 || args.length === 5) {
      const [x, y, width, height, corners] = args
      figure = new Rectangle({ x, y, width, height }, corners)
    }
    if (!figure) throw new Error('mismatch parameters')
    this.#figureStack.add(figure)
    figure.onModified = () => (this.modified = true)
    return this
  }

  line () {
    const figure = new Line(this)
    this.#figureStack.add(figure)
    figure.onModified = () => (this.modified = true)
    return figure
  }

  circle (center: IPoint, radius: number, segmentCount?: number, smooth?: number): this | Shape2
  // eslint-disable-next-line no-dupe-class-members
  circle (x: number, y: number, radius: number, segmentCount?: number, smooth?: number): this | Shape2
  // eslint-disable-next-line no-dupe-class-members
  circle (...args: Array<any>): this | Shape2 {
    let figure: Circle | null = null

    if (args.length >= 3 && typeof args[0] === 'number' && typeof args[1] === 'number' && typeof args[2] === 'number') {
      const [x, y, radius, segmentCount, smooth] = args
      figure = new Circle(x, y, radius, segmentCount, smooth)
    }

    if (args.length >= 2 && typeof args[0] === 'object' && typeof args[1] === 'number') {
      const [center, radius, segmentCount, smooth] = args
      figure = new Circle(center.x, center.y, radius, segmentCount, smooth)
    }

    if (!figure) throw new Error('mismatch parameters')

    this.#figureStack.add(figure)
    figure.onModified = () => (this.modified = true)
    return this
  }

  arc (center: IPoint, radius: number, startAngle?: number, endAngle?: number, counterclockwise?: boolean): this | Shape2
  // eslint-disable-next-line no-dupe-class-members
  arc (x: number, y: number, radius: number, startAngle?: number, endAngle?: number, counterclockwise?: boolean): this | Shape2
  // eslint-disable-next-line no-dupe-class-members
  arc (...args: Array<any>): this | Shape2 {
    let figure: Arc | null = null

    if (args.length >= 3 && typeof args[0] === 'number' && typeof args[1] === 'number' && typeof args[2] === 'number') {
      const [x, y, radius, startAngle, endAngle, counterclockwise] = args
      figure = new Arc(x, y, radius, startAngle ?? 0, endAngle ?? Math.PI * 2, counterclockwise)
    }

    if (args.length >= 2 && typeof args[0] === 'object' && typeof args[1] === 'number') {
      const [point, radius, startAngle, endAngle, counterclockwise] = args
      figure = new Arc(point.x, point.y, radius, startAngle ?? 0, endAngle ?? Math.PI * 2, counterclockwise)
    }

    if (!figure) throw new Error('mismatch parameters')

    this.#figureStack.add(figure)
    figure.onModified = () => (this.modified = true)
    return this
  }

  ellipse (center: IPoint, radiusX: number, radiusY: number, rotation?: number, startAngle?: number, endAngle?: number, counterclockwise?: boolean): this | Shape2
  // eslint-disable-next-line no-dupe-class-members
  ellipse (x: number, y: number, radiusX: number, radiusY: number, rotation?: number, startAngle?: number, endAngle?: number, counterclockwise?: boolean): this | Shape2
  // eslint-disable-next-line no-dupe-class-members
  ellipse (...args: Array<any>): this | Shape2 {
    let figure: Ellipse | null = null

    if (args.length >= 4 && typeof args[0] === 'number' && typeof args[1] === 'number' && typeof args[2] === 'number') {
      const [x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise] = args
      figure = new Ellipse(x, y, radiusX, radiusY, rotation ?? 0, startAngle ?? 0, endAngle ?? Math.PI * 2, counterclockwise)
    }

    if (args.length >= 3 && typeof args[0] === 'object' && typeof args[1] === 'number') {
      const [point, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise] = args
      figure = new Ellipse(point.x, point.y, radiusX, radiusY, rotation ?? 0, startAngle ?? 0, endAngle ?? Math.PI * 2, counterclockwise)
    }

    if (!figure) throw new Error('mismatch parameters')

    this.#figureStack.add(figure)
    figure.onModified = () => (this.modified = true)
    return this
  }

  getType (): DrawableType {
    return 'shape'
  }

  get bounds (): Rect {
    return this.#figureStack.bounds
  }

  inPath (p: Point): boolean {
    return Context2DFactory.default.ctx.isPointInPath(this.#figureStack.path2d, p.x, p.y)
  }

  toPath2D (): Path2DBase {
    this.modified = false
    return this.#figureStack.path2d
  }

  protected get transform (): Matrix2D {
    return this.transform
  }

  protected set transform (value: Matrix2D) {
    this.transform = value
  }

  static create (style?: ShapeStyle) {
    return new Shape2(0, style || {})
  }
}
