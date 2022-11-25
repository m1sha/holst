import { Drawable, DrawableType } from './drawable'
import { FigureStack } from './figures/figure-stack'
import { Line } from './figures/line'
import { Rectangle } from './figures/rectangle'
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

  rect (x: number, y: number, width: number, height: number): this | Shape2
  // eslint-disable-next-line no-dupe-class-members
  rect (point: IPoint, size: Size): this | Shape2
  // eslint-disable-next-line no-dupe-class-members
  rect (rect: IRect): this | Shape2
  // eslint-disable-next-line no-dupe-class-members
  rect (...args: Array<any>): this | Shape2 {
    let rectangle: Rectangle | null = null
    if (args.length === 1) {
      rectangle = new Rectangle(args[0])
    }
    if (args.length === 2) {
      const rect: IRect = { ...args[0], ...args[1] }
      rectangle = new Rectangle(rect)
    }
    if (args.length === 4) {
      const [x, y, width, height] = args
      rectangle = new Rectangle({ x, y, width, height })
    }
    if (!rectangle) throw new Error('mismatch parameters')
    this.#figureStack.add(rectangle)
    return this
  }

  line () {
    const line = new Line(this)
    this.#figureStack.add(line)
    return line
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
    return this.#figureStack.path2d
  }

  protected get transform (): Matrix2D {
    return this.transform
  }

  protected set transform (value: Matrix2D) {
    this.transform = value
  }
}
