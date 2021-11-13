import { getRatio } from '../chart2/utils'
import array from '../tools/array'
import { Constraints } from './constraints'
import { Context2DOrientation } from './context2d'
import Context2DBase from './context2d-base'
import { Image, Images } from './image'
import { Text, TextBlock } from './label'
import { TextStyle } from './label-style'
import { Padding } from './padding'
import { Point } from './point'
import { Rect } from './rect'
import Shape from './shape'
import { ShapeStyle } from './shape-style'
import { Size } from './size'
import { TransformationPath } from './transformation-path'
import { rect, toAbsolute } from './utils'

export class Layer {
  private readonly ctx: Context2DBase
  private shapes: Shape[]
  private labels: Text[]
  private textBlocks: TextBlock[]
  private images: Images
  private mask: Shape | null
  private orderCounter: number
  readonly location: Point
  readonly size: Size
  readonly originSize: Readonly<Size>
  orientation: Context2DOrientation
  constraints: Constraints

  constructor (ctx: Context2DBase, orientation: Context2DOrientation) {
    this.ctx = ctx
    this.orientation = orientation
    this.constraints = { minX: 0, minY: 0, maxX: ctx.width, maxY: ctx.height }
    this.location = { x: 0, y: 0 }
    this.size = { width: ctx.width, height: ctx.height }
    this.originSize = { width: ctx.width, height: ctx.height }
    this.mask = null
    this.clear()
  }

  get center (): Point {
    return { x: this.size.width / 2, y: this.size.height / 2 }
  }

  get bounds (): Readonly<Rect> {
    return { x: this.location.x, y: this.location.y, width: this.size.width, height: this.size.height }
  }

  createShape (style: ShapeStyle = null): Shape {
    const path = new TransformationPath()
    const result = new Shape(this, path, ++this.orderCounter, style)
    this.shapes.push(result)
    return result
  }

  createText (text: Text): void {
    this.labels.push(text)
  }

  createTextBlock (text: string, style: TextStyle, target?: Point): TextBlock {
    const result = new TextBlock(text, style, ++this.orderCounter, (text, style) => this.measureText(text, style))
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

  draw () {
    for (const image of this.images) {
      this.ctx.drawImage(image.src, image.sx, image.sy, image.sWidth, image.sHeight, image.dx, image.dy, image.dWidth, image.dHeight)
    }

    const renderList = [...this.shapes, ...this.textBlocks].sort(array.asc('order'))
    for (const item of renderList) {
      if (item instanceof Shape) this.ctx.drawShape(item, this.mask)
      if (item instanceof TextBlock) this.ctx.drawTextBlock(item, this.mask)
    }

    this.drawOldTextLabels()
  }

  measureText (text: string, style: TextStyle) { return this.ctx.measureText(text, style) }

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
      this.mask.rect(rect(0, 0, this.size.width, this.size.height))
    }
    return this.mask
  }

  removeMask (): void {
    this.mask = null
  }

  get allShapes (): Shape[] {
    return this.shapes
  }

  private drawOldTextLabels () {
    for (const label of this.labels) {
      const l = {
        value: label.value,
        x: w => toAbsolute({ x: label.x(w), y: 0 }, this.orientation, this.location, this.originSize).x,
        y: w => toAbsolute({ x: 0, y: label.y(w) }, this.orientation, this.location, this.originSize).y,
        style: label.style
      }
      this.ctx.drawText(l, this.mask)
    }
  }
}
