import { Label } from './label'
import { LabelStyle } from './label-style'
import { Point } from './point'
import Shape from './shape'

export class Layer {
  private readonly ctx: CanvasRenderingContext2D
  private target: Point
  private shapes: Shape[]
  private labels: Label[]

  constructor (ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.clear()
  }

  createShape (): Shape {
    const result = new Shape()
    this.shapes.push(result)
    return result
  }

  createText (label: Label): void {
    this.labels.push(label)
  }

  addShape (shape: Shape): void {
    this.shapes.push(shape)
  }

  clear () {
    this.shapes = []
    this.labels = []
  }

  get location (): Point {
    return this.target
  }

  set location (point: Point) {
    this.target = point
  }

  render () {
    for (const shape of this.shapes) {
      this.drawShape(shape)
    }

    for (const label of this.labels) {
      this.drawLabel(label)
    }
  }

  private drawShape (shape: Shape): void {
    this.ctx.save()
    if (shape.style.strokeStyle) {
      this.ctx.strokeStyle = shape.style.strokeStyle
      this.ctx.lineWidth = shape.style.lineWidth
      this.ctx.stroke(shape.getPath())
    }
    if (shape.style.fillStyle) {
      this.ctx.fillStyle = shape.style.fillStyle
      this.ctx.fill(shape.getPath())
    }
    this.ctx.restore()
  }

  private drawLabel (label: Label) {
    this.ctx.save()
    const style: LabelStyle = label.style || {}
    this.ctx.fillStyle = style.color || '#000'
    const fontName = style.fontName || 'serif'
    const fontSize = style.fontSize || '10pt'
    this.ctx.font = `${fontSize} ${fontName}`
    const width = this.ctx.measureText(label.text).width
    const x = label.x(width)
    const y = label.y(width)
    this.ctx.fillText(label.text, x, y)
    this.ctx.restore()
  }
}
