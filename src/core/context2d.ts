import Context2DBase from './context2d-base'
import { EventType } from './event-type'
import { Text } from './label'
import { TextStyle } from './label-style'
import Shape from './shape'
export type Context2DOrientation = 'top-left' | 'bottom-left'
export class Context2D implements Context2DBase {
  readonly ctx: CanvasRenderingContext2D
  // orientation: Context2DOrientation

  constructor (ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.ctx.imageSmoothingEnabled = true
  }

  get width () { return this.ctx.canvas.width }
  get height () { return this.ctx.canvas.height }

  drawText (label: Text, mask?: Shape) {
    this.ctx.save()
    this.assignMask(mask)
    this.assignTextStyle(label.style)
    const width = this.measureText(label.value, label.style).width
    const x = label.x(width)
    const y = label.y(width)
    this.ctx.fillText(label.value, x, y)
    this.ctx.restore()
  }

  drawShape (shape: Shape, mask?: Shape) {
    this.ctx.save()
    this.assignMask(mask)
    const { style } = shape
    if (style.strokeStyle) {
      this.ctx.strokeStyle = style.strokeStyle
      this.ctx.lineWidth = style.lineWidth
      this.ctx.lineJoin = style.lineJoin
      this.ctx.lineDashOffset = style.lineDashOffset
      if (style.lineDash) this.ctx.setLineDash(style.lineDash)
      this.ctx.stroke(shape.getPath())
    }
    if (style.fillStyle) {
      this.ctx.fillStyle = style.fillStyle
      this.ctx.fill(shape.getPath())
    }
    this.ctx.restore()
  }

  measureText (text: string, style: TextStyle) {
    this.ctx.save()
    this.assignTextStyle(style)
    const result = this.ctx.measureText(text)
    this.ctx.restore()
    return result
  }

  createPath (): Path2D {
    return new Path2D()
  }

  on (a: (eventType: EventType, event: Event | MouseEvent | KeyboardEvent) => void, ...events: EventType[]) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i]
      this.ctx.canvas['on' + event] = e => a(event, e)
    }
  }

  private assignTextStyle (style: TextStyle) {
    style = style || {}
    this.ctx.fillStyle = style.color || '#000'
    const fontName = style.fontName || 'serif'
    const fontSize = style.fontSize || '10pt'
    this.ctx.font = `${fontSize} ${fontName}`
  }

  private assignMask (mask?: Shape) {
    if (!mask) return
    this.ctx.clip(mask.getPath())
  }
}
