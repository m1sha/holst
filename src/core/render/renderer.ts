import { AnimationHandler } from '../animations/animation-handler'
import { EventHandler } from '../events/event-handler2'
import { Scene } from '../scene'
import { Layer } from '../layers'
import { sort } from '../../utils/sorter'
import { Drawable } from '../drawable'
import { drawDrawables } from './drafters/draw-drawables'
import { internal } from '../../utils/internal'
import { IEventHandlerProvider } from '../events/event-handler-provider'
import { Rect } from '../../core/geometry/rect'
import { Matrix2D } from '../../core/matrix'
export interface IRenderer {
  render (scene: Scene): void
  clear (): void
  onFrameChanged: (() => void) | null
}

export abstract class RendererBase implements IRenderer {
  #eventHandler: EventHandler | null = null
  #animationHandler: AnimationHandler | null = null
  onFrameChanged: (() => void) | null = null
  protected viewport: Rect = new Rect(0, 0, 0, 0)
  protected viewportMatrix: Matrix2D = Matrix2D.identity

  render (scene: Scene): void {
    if (this.animationHandler.isStarted) return
    this.animationHandler.start(scene)
    const eventHandler = internal<IEventHandlerProvider>(scene).eventHandler
    this.eventHandler.setSceneEventHandlers(eventHandler)
  }

  abstract clear (): void

  protected abstract getCanvas(): HTMLCanvasElement

  setAnimationRate (rate: number) {
    this.animationHandler.rate = rate
  }

  getAnimationRate () {
    return this.animationHandler.rate
  }

  getAnimationFps () {
    return this.animationHandler.fps
  }

  protected drawLayer ({ drawables, mask }: Readonly<Layer>, ctx: CanvasRenderingContext2D, forceRedraw: boolean) {
    drawDrawables(ctx, drawables, mask, this.viewportMatrix, forceRedraw, item => this.setHandler(item))
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
