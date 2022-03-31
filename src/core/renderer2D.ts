import Renderer2DBase from './renderer2d-base'
import { EventType } from './event-type'
import { Text, TextBlock } from './label'
import { TextStyle } from './label-style'
import { Layer } from './layers'
import { Scene } from './scene'
import Shape from './shape'
import { Color } from './color'
import { Image } from './image'
import { sort } from './sorter'

export class Renderer2D implements Renderer2DBase {
  readonly ctx: CanvasRenderingContext2D

  constructor (ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.ctx.imageSmoothingEnabled = true
  }

  render (scene: Scene): void {
    for (const layer of [...scene.allLayers, scene.actionLayer]) this.drawLayer(layer)
  }

  clear (): void {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  drawImage (image: HTMLCanvasElement | HTMLImageElement | SVGImageElement | HTMLVideoElement | ImageBitmap, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number): void {
    this.ctx.drawImage(image, sx, sy)
  }

  get width () { return this.ctx.canvas.width }
  get height () { return this.ctx.canvas.height }

  drawText (label: Text, mask?: Shape | null) {
    this.ctx.save()
    this.assignMask(mask)
    this.assignTextStyle(label.style)
    const width = this.measureText(label.value, label.style).width
    const x = label.x(width)
    const y = label.y(width)
    this.ctx.fillText(label.value, x, y)
    this.ctx.restore()
  }

  drawTextBlock (block: TextBlock, mask?: Shape | null): void {
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

  drawShape (shape: Shape, mask?: Shape | null) {
    this.ctx.save()
    this.assignMask(mask)
    const { style } = shape
    const path = shape.toPath2D()
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
      const canvas = this.ctx.canvas as unknown as Record<string, unknown>
      canvas['on' + event] = (e: Event) => a(event, e)
    }
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

  private drawLayer (layer: Readonly<Layer>) {
    const renderList = sort([...layer.allShapes, ...layer.textBlocks, ...layer.images])// .sort(array.asc('order'))
    for (const item of renderList) {
      if (item instanceof Shape) this.drawShape(item, layer.mask)
      if (item instanceof TextBlock) this.drawTextBlock(item, layer.mask)
      if (item instanceof Image) {
        this.ctx.drawImage(item.src, item.sx, item.sy, item.sWidth || 0, item.sHeight || 0, item.dx || 0, item.dy || 0, item.dWidth || 0, item.dHeight || 0)
      }
    }
  }
}
