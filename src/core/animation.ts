import { Renderer2D } from './renderer2D'
import { Scene } from './scene'

export interface KeyFrame {
  key: number
  action: () => void
}

export class AnimationController {
  private renderer: Renderer2D
  private scene: Scene
  private timerId!: number
  private delegates: ((frameNum: number) => void)[] = []
  private startFrameNum: number
  maxFrames: number = 960
  infinityLoop: boolean = false
  // keyFrames: KeyFrame[] = []

  constructor (scene: Scene, renderer: Renderer2D) {
    this.scene = scene
    this.renderer = renderer
    this.init()
  }

  private init () {
    this.timerId = window.requestAnimationFrame(r => {
      this.startFrameNum = r
      this.onKeyFrame(r)
    })
  }

  // addFrame (frame: Frame) {
  //   this.frames.push(frame)
  // }

  onFrameChange (delegate: (frameNum: number) => void) {
    this.delegates.push(delegate)
  }

  dispose (): void {
    cancelAnimationFrame(this.timerId)
  }

  private onKeyFrame (frameNum: number) {
    if (frameNum - this.startFrameNum > this.maxFrames) {
      if (!this.infinityLoop) {
        cancelAnimationFrame(this.timerId)
        return
      }
      this.startFrameNum = frameNum
    }
    for (const d of this.delegates) d(frameNum - this.startFrameNum)
    this.scene.clearActiveLayer()
    this.renderer.clear()
    this.renderer.render(this.scene)

    this.timerId = window.requestAnimationFrame(r => {
      this.onKeyFrame(r)
    })
  }
}
