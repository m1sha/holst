import { EventType } from './event-type'
import { TextBlock } from './label'
import { Layer } from './layers'
import { Scene } from './scene'
import Shape from './shape'
import { Raster } from './raster'
import { sort } from './sorter'
import { Viewport } from './viewport'
import Orderable from './orderable'
import { EventHandler } from './events/event-handler2'
import { AnimationHandler } from './animation-handler'
import { drawShape } from './render/drafters/draw-shape'
import { drawTextBlock } from './render/drafters/draw-text-block'
import { Sprite } from './sprite'

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
    if (this.viewport.modified) {
      layers.forEach(l => l.shapes.forEach(s => s.update()))
      this.viewport.modified = false
    }

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
      if (item instanceof Shape && !item.hidden) this.drawShape(item, mask)
      if (item instanceof TextBlock && !item.hidden) this.drawTextBlock(item, mask)
      if (item instanceof Raster) this.drawImage(item)
      if (item instanceof Sprite) this.drawSprite(item)
    }
  }

  private drawShape (shape: Shape, mask?: Shape | null) {
    this.draw(() => drawShape(this.ctx, shape), shape, mask)
  }

  private drawTextBlock (block: TextBlock, mask?: Shape | null): void {
    this.draw(() => drawTextBlock(this.ctx, block), block, mask)
  }

  private drawImage (raster: Raster): void {
    this.ctx.drawImage(
      raster.src,
      raster.srcRect.x,
      raster.srcRect.y,
      raster.srcRect.width || 0,
      raster.srcRect.height || 0,
      raster.distRect?.x || 0,
      raster.distRect?.y || 0,
      raster.distRect?.width || 0,
      raster.distRect?.height || 0
    )
  }

  private drawSprite (sprite: Sprite) {
    this.ctx.drawImage(
      sprite.raster.src,
      sprite.framePosition.x,
      sprite.framePosition.y,
      sprite.tileSize.width || 0,
      sprite.tileSize.height || 0,
      sprite.position.x || 0,
      sprite.position.y || 0,
      sprite.tileSize.width || 0,
      sprite.tileSize.height || 0
    )
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
