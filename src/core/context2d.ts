import Context2DBase from './context2d-base'
import { EventType } from './event-type'
import { Text, TextBlock } from './label'
import { TextStyle } from './label-style'
import Shape from './shape'
export type Context2DOrientation = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right'
export class Context2D implements Context2DBase {
  readonly ctx: CanvasRenderingContext2D
  // orientation: Context2DOrientation

  constructor (ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.ctx.imageSmoothingEnabled = true
  }

  drawImage (image: HTMLCanvasElement | HTMLImageElement | SVGImageElement | HTMLVideoElement | ImageBitmap, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number): void {
    this.ctx.drawImage(image, sx, sy)
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

  drawTextBlock (block: TextBlock, mask?: Shape): void {
    this.ctx.save()
    this.assignMask(mask)
    this.assignTextStyle(block.style)
    if (!block.multiline) {
      this.ctx.fillText(block.text, block.target.x, block.target.y)
    } else {
      let y = block.target.y
      for (const line of block.lines) {
        this.ctx.fillText(line, block.target.x, y)
        y += block.lineHeight
      }
    }
    this.ctx.restore()
  }

  drawShape (shape: Shape, mask?: Shape) {
    this.ctx.save()
    this.assignMask(mask)
    const { style } = shape
    const path = shape.createPath()
    if (style.strokeStyle) {
      this.ctx.strokeStyle = style.strokeStyle
      this.ctx.lineWidth = style.lineWidth
      this.ctx.lineJoin = style.lineJoin
      this.ctx.lineDashOffset = style.lineDashOffset
      if (style.lineDash) this.ctx.setLineDash(style.lineDash)
      this.ctx.stroke(path)
    }
    if (style.fillStyle) {
      this.ctx.fillStyle = style.fillStyle
      this.ctx.fill(path)
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
    this.ctx.clip(mask.createPath())
  }
}
