/* global FrameRequestCallback */
import { Scene } from '../scene'
import { IRenderer } from '../render/renderer'
import { internal } from '../../utils/internal'
import { IAnimationProvider } from './animation-provider'

export class AnimationHandler {
  private renderer: IRenderer
  private scene: Scene | null = null
  private handlerId: number = -1
  private state: number = 0
  private startTime: number = -1
  private animationLength: number = 1000 / 61 // Animation length in milliseconds
  private clock = 0
  #fps: number = 0

  constructor (renderer: IRenderer) {
    this.renderer = renderer
  }

  start (scene: Scene): void {
    this.state = 1
    this.scene = scene
    this.handlerId = this.nextTick()
  }

  stop (): void {
    this.state = 0
    cancelAnimationFrame(this.handlerId)
  }

  get isStarted (): boolean {
    return this.state === 1
  }

  get rate (): number {
    return this.animationLength
  }

  set rate (value: number) {
    this.animationLength = value
  }

  get fps (): number {
    return this.#fps
  }

  private handler (timestamp: number) {
    if (this.preRun(timestamp)) return

    if (timestamp < this.animationLength + this.startTime) {
      this.nextTick()
      return
    }

    if (!this.scene) {
      this.stop()
      throw new Error('scene is not defined')
    }

    this.startTime = timestamp
    this.renderer.clear()
    internal<IAnimationProvider>(this.scene).invokeAnimation(timestamp)
    if (this.renderer.onFrameChanged) this.renderer.onFrameChanged()
    this.renderer.render(this.scene)

    this.#fps = 1000 / (timestamp - this.clock)
    this.clock = timestamp
    this.nextTick()
  }

  private preRun (timestamp: number) {
    if (this.startTime > 0) return false

    this.startTime = timestamp
    this.nextTick()
    this.clock = timestamp
    return true
  }

  private nextTick () {
    return GlobalAnimationFrameHandlerFactory.requestAnimationFrame(r => this.handler(r))
  }
}

const GlobalAnimationFrameHandlerFactory = {
  requestAnimationFrame: (callback: FrameRequestCallback) => window.requestAnimationFrame(callback)
}

export { GlobalAnimationFrameHandlerFactory }
