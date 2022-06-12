import { EventType } from './event-type'
import { TextBlock } from './label'
import { TextStyle } from './label-style'
import { Layer } from './layers'
import { Scene } from './scene'
import Shape from './shape'
import { Color } from './color'
import { Bitmap } from './bitmap'
import { sort } from './sorter'
import { Viewport } from './viewport'
import Orderable from './orderable'
import { EventHandler } from './events/event-handler2'
import { AnimationHandler } from './animation-handler'

export class Renderer2D {
  readonly ctx: CanvasRenderingContext2D
  readonly viewport: Viewport
  private eventHandler: EventHandler
  private animationHandler: AnimationHandler
  onFrameChanged: (() => void) | null = null

  constructor (ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.ctx.imageSmoothingEnabled = true
    this.viewport = new Viewport(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.eventHandler = new EventHandler(this.ctx.canvas)
    this.animationHandler = new AnimationHandler(this)
  }

  render (scene: Scene): void {
    if (!this.animationHandler.isStarted) this.animationHandler.start(scene)
    const layers = sort<Layer>(scene.layers)
    if (this.viewport.modified) {
      layers.forEach(l => l.shapes.forEach(s => s.update()))
      this.viewport.modified = false
    }
    for (const layer of [...layers, scene.actionLayer]) this.drawLayer(layer)
  }

  clear (): void {
    const { width, height } = this.viewport
    this.ctx.clearRect(0, 0, width, height)
  }

  addEventListener (a: (eventType: EventType, event: Event | MouseEvent | KeyboardEvent) => void, ...events: EventType[]) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i]
      const canvas = this.ctx.canvas as unknown as Record<string, unknown>
      canvas['on' + event] = (e: Event) => a(event, e)
    }
  }

  private drawLayer ({ entities, mask }: Readonly<Layer>) {
    const list = sort(entities as Orderable[])

    for (const item of list) {
      if (item instanceof Shape) this.drawShape(item, mask)
      if (item instanceof TextBlock) this.drawTextBlock(item, mask)
      if (item instanceof Bitmap) this.drawImage(item)
    }
  }

  private drawShape (shape: Shape, mask?: Shape | null) {
    if (shape.eventHandler.type === 'bag') {
      this.eventHandler.fromBag(shape.eventHandler)
      shape.eventHandler = this.eventHandler
    }
    this.ctx.save()
    this.assignMask(mask)
    const { style } = shape
    const path = shape.toPath2D(this.viewport.transform)
    if (style.strokeStyle) {
      this.ctx.strokeStyle = style.strokeStyle instanceof Color ? style.strokeStyle.toString() : style.strokeStyle
      this.ctx.lineWidth = style.lineWidth || 1
      this.ctx.lineJoin = style.lineJoin || 'bevel'
      this.ctx.lineDashOffset = style.lineDashOffset || 0
      this.ctx.lineCap = style.lineCap || 'butt'
      if (style.lineDash) this.ctx.setLineDash(style.lineDash)
      this.ctx.stroke(path)
    }
    if (style.fillStyle) {
      this.ctx.fillStyle = style.fillStyle instanceof Color ? this.ctx.fillStyle = style.fillStyle.toString() : style.fillStyle
      this.ctx.fill(path)
    }
    this.ctx.restore()
  }

  private drawTextBlock (block: TextBlock, mask?: Shape | null): void {
    this.ctx.save()
    this.assignMask(mask)
    this.assignTextStyle(block.style)
    if (!block.multiline) {
      this.ctx.fillText(block.text, block.target.x, block.target.y)
    } else {
      let y = block.target.y + block.charHeight
      for (const line of block.lines) {
        let x = block.target.x
        if (block.alignment === 'center') {
          x += block.width / 2 - block.getWidth(line) / 2
        }
        this.ctx.fillText(line, x, y)
        y += block.charHeight + block.lineHeight
      }
    }
    this.ctx.restore()
  }

  private drawImage ({ src, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight }: Bitmap): void {
    this.ctx.drawImage(src, sx, sy, sWidth || 0, sHeight || 0, dx || 0, dy || 0, dWidth || 0, dHeight || 0)
  }

  private assignTextStyle (style: TextStyle) {
    style = style || {}
    this.ctx.fillStyle = style.color instanceof Color ? style.color.toString() : style.color || '#000'
    const fontName = style.fontName || 'serif'
    const fontSize = style.fontSize || '10pt'
    const bold = style.bold ? 'bold ' : ''
    const italic = style.italic ? 'italic ' : ''
    this.ctx.font = `${italic}${bold}${fontSize} ${fontName}`
  }

  private assignMask (mask?: Shape | null) {
    if (!mask) return
    this.ctx.clip(mask.toPath2D())
  }
}
