import { Context2D, Context2DOrientation } from './context2d'
import { Text } from './label'
import { TextStyle } from './label-style'
import { Padding } from './padding'
import { Point } from './point'
import { Rect } from './rect'
import Shape from './shape'
import { Size } from './size'
import { rect, toAbsolute } from './utils'

export class Layer {
  private readonly ctx: Context2D
  private shapes: Shape[]
  private labels: Text[]
  private mask: Shape | null
  readonly ratio: Point
  readonly location: Point
  readonly size: Size
  readonly originSize: Readonly<Size>
  readonly orientation: Context2DOrientation
  padding: Padding

  constructor (ctx: Context2D, orientation: Context2DOrientation) {
    this.ctx = ctx
    this.orientation = orientation
    this.ratio = { x: 0, y: 0 }
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

  createShape (): Shape {
    const result = new Shape(this)
    this.shapes.push(result)
    return result
  }

  createText (text: Text): void {
    this.labels.push(text)
  }

  addShape (shape: Shape): void {
    this.shapes.push(shape)
  }

  clear () {
    this.shapes = []
    this.labels = []
  }

  draw () {
    for (const shape of this.shapes) {
      this.ctx.drawShape(shape, this.mask)
    }

    for (const label of this.labels) {
      const l = {
        value: label.value,
        x: w => toAbsolute({ x: label.x(w), y: 0 }, this.orientation, this.location, this.originSize).x + this.location.x,
        y: w => toAbsolute({ x: 0, y: label.y(w) }, this.orientation, this.location, this.originSize).y - this.location.y,
        style: label.style
      }
      this.ctx.drawText(l, this.mask)
    }
  }

  measureText (text: string, style: TextStyle) { return this.ctx.measureText(text, style) }

  setPadding (padding: Padding): void {
    this.location.x = padding.left
    this.location.y = padding.top
    this.size.width = this.size.width - (padding.right + padding.left * 2)
    this.size.height = this.size.height - (padding.bottom + padding.top * 2)
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
}
