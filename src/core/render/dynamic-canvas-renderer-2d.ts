import { Scene } from '../scene'
import { Layer } from '../layers'
import { AnimationHandler } from '../animation-handler'
import { sort } from '../../utils/sorter'
import { IRenderer } from './renderer'
import { EventHandler } from '../events/event-handler2'
import { EventType } from '../event-type'
import Shape from '../shape'
import { TextBlock } from '../label'
import Orderable from '../orderable'
import { Drawable } from '../drawable'
import { drawShape } from '../render/drafters/draw-shape'
import { drawTextBlock } from '../render/drafters/draw-text-block'
import { drawRaster } from '../render/drafters/draw-raster'
import { drawSprite } from '../render/drafters/draw-sprite'
import { Raster } from '../raster'
import { Sprite } from '../sprite'

export class DynamicCanvasRenderer2D implements IRenderer {
  private backgroundCanvas: HTMLCanvasElement
  private foregroundCanvas: HTMLCanvasElement
  private backgroundCtx: CanvasRenderingContext2D
  private foregroundCtx: CanvasRenderingContext2D
  animationHandler: AnimationHandler
  eventHandler: EventHandler
  onFrameChanged: (() => void) | null = null

  constructor () {
    this.backgroundCanvas = document.createElement('canvas')
    this.foregroundCanvas = document.createElement('canvas')
    this.backgroundCtx = this.backgroundCanvas.getContext('2d')!!
    this.foregroundCtx = this.foregroundCanvas.getContext('2d')!!
    this.animationHandler = new AnimationHandler(this)
    this.eventHandler = new EventHandler(this.foregroundCanvas)
  }

  render (scene: Scene): void {
    if (!this.animationHandler.isStarted) this.animationHandler.start(scene)
    const layers = sort<Layer>(scene.layers)
    for (const layer of layers) {
      if (layer.canvasOrder === 'foreground') {
        this.drawLayer(layer, this.foregroundCtx)
        continue
      }
      this.drawLayer(layer, this.backgroundCtx)
    }
    this.drawLayer(scene.actionLayer, this.foregroundCtx)
  }

  clear () {
    const { width, height } = this.foregroundCanvas
    this.foregroundCtx.clearRect(0, 0, width, height)
  }

  addEventListener (a: (eventType: EventType, event: Event | MouseEvent | KeyboardEvent) => void, ...events: EventType[]) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i]
      const canvas = this.foregroundCtx.canvas as unknown as Record<string, unknown>
      canvas['on' + event] = (e: Event) => a(event, e)
    }
  }

  setAnimationRate (rate: number) {
    this.animationHandler.rate = rate
  }

  getAnimationRate () {
    return this.animationHandler.rate
  }

  getAnimationFps () {
    return this.animationHandler.fps
  }

  private drawLayer ({ entities, mask }: Readonly<Layer>, ctx: CanvasRenderingContext2D) {
    const list = sort(entities as Orderable[])

    for (const item of list) {
      if ((item as unknown as Drawable).hidden) continue
      if (item instanceof Shape) {
        this.setHandler(item)
        drawShape(ctx, item, mask)
      }
      if (item instanceof TextBlock) {
        this.setHandler(item)
        drawTextBlock(ctx, item, mask)
      }
      if (item instanceof Raster) drawRaster(ctx, item, mask)
      if (item instanceof Sprite) drawSprite(ctx, item, mask)
    }
  }

  private setHandler (obj: Shape | TextBlock) {
    if (obj.eventHandler.type !== 'bag') return
    this.eventHandler.fromBag(obj.eventHandler)
    obj.eventHandler = this.eventHandler
  }

  get canvases () {
    return [this.backgroundCanvas, this.foregroundCanvas]
  }
}
