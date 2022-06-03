import { Scene } from './scene'
import { Renderer2D } from './renderer2D'

export class AnimationHandler {
  private renderer: Renderer2D
  private scene: Scene | null = null
  private handlerId: number = -1
  private state: number = 0
  private startTime: number = -1
  private animationLength: number = 1000 / 60 // Animation length in milliseconds

  constructor (renderer: Renderer2D) {
    this.renderer = renderer
  }

  start (scene: Scene): void {
    this.state = 1
    this.scene = scene
    this.handlerId = requestAnimationFrame(r => this.handler(r))
  }

  stop (): void {
    this.state = 0
    cancelAnimationFrame(this.handlerId)
  }

  get isStarted (): boolean {
    return this.state === 1
  }

  private handler (timestamp: number) {
    if (this.startTime < 0) {
      this.startTime = timestamp
      requestAnimationFrame(r => this.handler(r))
      return
    }

    if (timestamp > this.animationLength + this.startTime) {
      this.startTime = timestamp
      if (!this.scene) {
        this.stop()
        throw new Error('scene is not defined')
      }
      this.renderer.clear()
      if (this.renderer.onFrameChanged) this.renderer.onFrameChanged()
      this.renderer.render(this.scene)
    }
    requestAnimationFrame(r => this.handler(r))
  }
}
