import { AnimationHandler } from '../animations/animation-handler'
import { EventHandler } from '../events/event-handler2'
import { Scene } from '../scene'
import { EventType } from '../events/event-type'
import { Layer } from '../layers'
import { sort } from '../../utils/sorter'
import Orderable from '../orderable'
import { Drawable } from '../drawable'
import { drawDrawables } from './drafters/draw-drawables'
export interface IRenderer {
  render (scene: Scene): void
  clear (): void
  onFrameChanged: (() => void) | null
}

export abstract class RendererBase implements IRenderer {
  #eventHandler: EventHandler | null = null
  #animationHandler: AnimationHandler | null = null
  onFrameChanged: (() => void) | null = null

  render (scene: Scene): void {
    if (this.animationHandler.isStarted) return
    this.animationHandler.start(scene)
    this.eventHandler.setSceneEventHandlers(scene.eventHandler)
  }

  abstract clear (): void

  protected abstract getCanvas(): HTMLCanvasElement

  addEventListener (a: (eventType: EventType, event: Event | MouseEvent | KeyboardEvent) => void, ...events: EventType[]) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i]
      const canvas = this.getCanvas() as unknown as Record<string, unknown>
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

  protected drawLayer ({ entities, mask }: Readonly<Layer>, ctx: CanvasRenderingContext2D) {
    const list = sort(entities as Orderable[]) as Drawable[]

    drawDrawables(ctx, list, mask, item => this.setHandler(item))
  }

  protected setHandler (obj: Drawable) {
    if (obj.eventHandler.type !== 'bag') return
    this.eventHandler.fromBag(obj.eventHandler)
    obj.eventHandler = this.eventHandler
  }

  protected sortLayers (layers: Layer[]) {
    return sort<Layer>(layers)
  }

  protected get eventHandler (): EventHandler {
    if (this.#eventHandler) return this.#eventHandler
    return (this.#eventHandler = new EventHandler(this.getCanvas()))
  }

  protected get animationHandler (): AnimationHandler {
    if (this.#animationHandler) return this.#animationHandler
    return (this.#animationHandler = new AnimationHandler(this))
  }
}
