import { EventType } from './event-type'
import { TextBlock } from './label'
import { Layer } from './layers'
import { Scene } from './scene'
import Shape from './shape'
import { Raster } from './raster'
import { sort } from '../utils/sorter'
import { Viewport } from './viewport'
import Orderable from './orderable'
import { EventHandler } from './events/event-handler2'
import { AnimationHandler } from './animation-handler'
import { drawShape } from './render/drafters/draw-shape'
import { drawTextBlock } from './render/drafters/draw-text-block'
import { drawRaster } from './render/drafters/draw-raster'
import { drawSprite } from './render/drafters/draw-sprite'
import { Sprite } from './sprite'
import { Drawable } from './drawable'

export class Renderer2D {
  readonly ctx: CanvasRenderingContext2D
  readonly viewport: Viewport
  eventHandler: EventHandler
  animationHandler: AnimationHandler
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
    for (const layer of layers) this.drawLayer(layer)
    this.drawLayer(scene.actionLayer)
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
      if ((item as unknown as Drawable).hidden) continue
      if (item instanceof Shape) {
        this.setHandler(item)
        drawShape(this.ctx, item, mask)
      }
      if (item instanceof TextBlock) {
        this.setHandler(item)
        drawTextBlock(this.ctx, item, mask)
      }
      if (item instanceof Raster) drawRaster(this.ctx, item, mask)
      if (item instanceof Sprite) drawSprite(this.ctx, item, mask)
    }
  }

  private setHandler (obj: Shape | TextBlock) {
    if (obj.eventHandler.type !== 'bag') return
    this.eventHandler.fromBag(obj.eventHandler)
    obj.eventHandler = this.eventHandler
  }
}
