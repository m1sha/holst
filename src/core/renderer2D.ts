import { EventType } from './event-type'
import { TextBlock } from './label'
import { Layer } from './layers'
import { Scene } from './scene'
import Shape from './shape'
import { Bitmap } from './bitmap'
import { sort } from './sorter'
import { Viewport } from './viewport'
import Orderable from './orderable'
import { EventHandler } from './events/event-handler2'
import { AnimationHandler } from './animation-handler'
import { drawShape } from './drafters/draw-shape'
import { drawTextBlock } from './drafters/draw-text-block'

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
    this.draw(() => drawShape(this.ctx, shape, this.viewport.transform), shape, mask)
  }

  private drawTextBlock (block: TextBlock, mask?: Shape | null): void {
    this.draw(() => drawTextBlock(this.ctx, block), block, mask)
  }

  private drawImage ({ src, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight }: Bitmap): void {
    this.ctx.drawImage(src, sx, sy, sWidth || 0, sHeight || 0, dx || 0, dy || 0, dWidth || 0, dHeight || 0)
  }

  private draw (action: () => void, obj: Shape | TextBlock, mask?: Shape | null) {
    this.setHandler(obj)
    this.ctx.save()
    this.assignMask(mask)
    action()
    this.ctx.restore()
  }

  private assignMask (mask?: Shape | null) {
    if (!mask) return
    this.ctx.clip(mask.toPath2D())
  }

  private setHandler (obj: Shape | TextBlock) {
    if (obj.eventHandler.type !== 'bag') return
    this.eventHandler.fromBag(obj.eventHandler)
    obj.eventHandler = this.eventHandler
  }
}
