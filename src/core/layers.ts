import { getRatio } from '../chart3/utils'
import { Constraints } from './constraints'
import { Context2DOrientation } from './renderer2D'
import { Image, Images } from './image'
import { Text, TextBlock } from './label'
import { TextStyle } from './label-style'
import { Padding } from './padding'
import { Point } from './point'
import { Rect } from './rect'
import Shape from './shape'
import { ShapeStyle } from './shape-style'
import { Size } from './size'
import { TextMeasurer } from './text-measurer'
import { MutablePath2D } from './mutable-path2d'
import { StyleManager } from './style-manager'

export class Layer {
  private styleManager: StyleManager
  private shapes: Shape[] = []
  labels: Text[] = []
  textBlocks: TextBlock[] = []
  images: Images = []
  mask: Shape | null
  private orderCounter: number = 0
  /**
  * @deprecated The method should not be used.
  */
  readonly location: Point
  /**
  * @deprecated The method should not be used.
  */
  readonly size: Size
  /**
  * @deprecated The method should not be used.
  */
  readonly originSize: Readonly<Size>
  /**
  * @deprecated The method should not be used.
  */
  orientation: Context2DOrientation
  /**
  * @deprecated The method should not be used.
  */
  constraints: Constraints

  constructor (size: Size, orientation: Context2DOrientation, styleManager: StyleManager) {
    this.orientation = orientation
    this.constraints = { minX: 0, minY: 0, maxX: size.width, maxY: size.height }
    this.location = new Point(0, 0)
    this.size = { width: size.width, height: size.height }
    this.originSize = { width: size.width, height: size.height }
    this.mask = null
    this.styleManager = styleManager
    this.clear()
  }

  get center (): Point {
    return { x: this.size.width / 2, y: this.size.height / 2 }
  }

  get bounds (): Readonly<Rect> {
    return new Rect(this.location.x, this.location.y, this.size.width, this.size.height)
  }

  createShape (style: ShapeStyle | string | null = null, path?: MutablePath2D): Shape {
    const stl = (typeof style === 'string') ? this.styleManager.shapes(style) : style
    if (!path) path = new MutablePath2D()
    const result = new Shape(this, path, ++this.orderCounter, stl)
    this.shapes.push(result)
    return result
  }

  createText (text: Text): void {
    this.labels.push(text)
  }

  createTextBlock (text: string, style: TextStyle | string, target?: Point): TextBlock {
    const stl = (typeof style === 'string') ? this.styleManager.texts(style) : style
    const result = new TextBlock(text, stl, ++this.orderCounter, (text, style) => this.measureText(text, stl))
    if (target) result.target = target
    this.textBlocks.push(result)
    return result
  }

  addShape (shape: Shape): void {
    if (!shape.order) shape.order = ++this.orderCounter
    this.shapes.push(shape)
  }

  createImage (img: Image) {
    this.images.push(img)
  }

  clear () {
    this.orderCounter = 0
    this.textBlocks = []
    this.shapes = []
    this.labels = []
    this.images = []
  }

  measureText (text: string, style: TextStyle) { return TextMeasurer.measureText(text, style) }

  setPadding (padding: Padding): void {
    this.location.x = padding.left
    this.location.y = padding.top
    this.size.width = padding.right > 0 ? this.size.width - (padding.right + padding.left) : this.size.width
    this.size.height = padding.bottom > 0 ? this.size.height - (padding.bottom + padding.top) : this.size.height
  }

  get ratio (): Point {
    return getRatio(this.constraints, this.bounds)
  }

  hitTest (point: Point): boolean {
    return point.x >= this.location.x && point.x <= this.size.width + this.location.x &&
           point.y >= this.location.y && point.y <= this.size.height + this.location.y
  }

  createMask (defaultRect?: boolean): Shape {
    this.mask = this.createShape()
    if (defaultRect || defaultRect === undefined) {
      this.mask.rect(new Rect(0, 0, this.size.width, this.size.height))
    }
    return this.mask
  }

  removeMask (): void {
    this.mask = null
  }

  get allShapes (): Shape[] {
    return this.shapes
  }
}
