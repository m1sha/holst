import { Scene } from './scene'

export interface KeyFrame {
  key: number
  action: () => void
}

export class AnimationController {
  private scene: Scene
  private timerId!: number
  private delegates: ((frameNum: number) => void)[] = []
  private startFrameNum: number
  maxFrames: number = 100
  infinityLoop: boolean
  // keyFrames: KeyFrame[] = []

  constructor (scene: Scene) {
    this.scene = scene
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
    this.scene.clear(true)
    this.scene.render()

    this.timerId = window.requestAnimationFrame(r => {
      this.onKeyFrame(r)
    })
  }
}
