import Renderer2DBase from './renderer2d-base'
import { EventType } from './event-type'
import { Text, TextBlock } from './label'
import { TextStyle } from './label-style'
import { Layer } from './layers'
import { Scene } from './scene'
import Shape from './shape'
import array from '../tools/array'
import { toAbsolute } from './utils'
import { deepCopyFast } from '../tools/deep-copy'
export type Context2DOrientation = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right'
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
    const bold = style.bold ? 'bold ' : ''
    const italic = style.italic ? 'italic ' : ''
    this.ctx.font = `${italic}${bold}${fontSize} ${fontName}`
  }

  private assignMask (mask?: Shape) {
    if (!mask) return
    this.ctx.clip(mask.createPath())
  }

  private drawLayer (layer: Readonly<Layer>) {
    for (const image of layer.images) {
      this.ctx.drawImage(image.src, image.sx, image.sy, image.sWidth, image.sHeight, image.dx, image.dy, image.dWidth, image.dHeight)
    }

    const renderList = [...layer.allShapes, ...layer.textBlocks].sort(array.asc('order'))
    for (const item of renderList) {
      if (item instanceof Shape) this.drawShape(item, layer.mask)
      if (item instanceof TextBlock) {
        // TODO Text relative coords to abs transform need convert to matrix
        const newItem = deepCopyFast(item)
        newItem.target = toAbsolute(newItem.target, layer.orientation, layer.location, layer.originSize)
        this.drawTextBlock(newItem, layer.mask)
      }
    }

    this.drawOldTextLabels(layer)
  }

  private drawOldTextLabels (layer: Readonly<Layer>) {
    for (const label of layer.labels) {
      const l = {
        value: label.value,
        x: w => toAbsolute({ x: label.x(w), y: 0 }, layer.orientation, layer.location, layer.originSize).x,
        y: w => toAbsolute({ x: 0, y: label.y(w) }, layer.orientation, layer.location, layer.originSize).y,
        style: label.style
      }
      this.drawText(l, layer.mask)
    }
  }
}
