import { Viewport } from '../viewport'
import { Scene } from '../scene'
import { Rect } from '../rect'
import { Layer } from '../layers'

interface ScrollBarStyle {
  trackSize: number
  trackBackgroundColor: string
  trackBorderColor: string
  thumbSize: number
  thumbBackgroundColor: string
  thumbBorderColor: string
}

export class ScrollBar {
  private viewport: Viewport
  private scene: Scene
  style: ScrollBarStyle
  constructor (scene: Scene, viewport: Viewport) {
    this.scene = scene
    this.viewport = viewport
    this.style = defaultScrollBarStyle()
  }

  create () {
    const scrollLayer = this.scene.createLayer('scroll')
    this.createHScroll(scrollLayer)
    this.createVScroll(scrollLayer)

    const { trackSize, trackBackgroundColor, trackBorderColor } = this.style
    const { width, height } = this.viewport
    scrollLayer
      .createShape({ fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor })
      .rect(new Rect(width - trackSize, height - trackSize, trackSize, trackSize))
  }

  private createHScroll (scrollLayer: Layer) {
    const { trackSize, trackBackgroundColor, trackBorderColor } = this.style
    const { width, height } = this.viewport
    scrollLayer
      .createShape({ fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor })
      .rect(new Rect(0, height - trackSize, width - trackSize - 2, trackSize))

    this.createHScrollThumb(scrollLayer, 60)
  }

  private createVScroll (scrollLayer: Layer) {
    const { trackSize, trackBackgroundColor, trackBorderColor } = this.style
    const { width, height } = this.viewport
    scrollLayer
      .createShape({ fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor })
      .rect(new Rect(width - trackSize, 0, trackSize, height - trackSize - 2))

    this.createVScrollThumb(scrollLayer, 60)
  }

  createHScrollThumb (scrollLayer: Layer, value: number) {
    const { thumbSize, thumbBackgroundColor, thumbBorderColor } = this.style
    const { height } = this.viewport
    scrollLayer
      .createShape({ fillStyle: thumbBackgroundColor, strokeStyle: thumbBorderColor })
      .rect(new Rect(thumbSize, height - thumbSize, value, thumbSize))
  }

  createVScrollThumb (scrollLayer: Layer, value: number) {
    const { thumbSize, thumbBackgroundColor, thumbBorderColor } = this.style
    const { width } = this.viewport
    scrollLayer
      .createShape({ fillStyle: thumbBackgroundColor, strokeStyle: thumbBorderColor })
      .rect(new Rect(width - thumbSize, thumbSize, thumbSize, value))
  }
}

function defaultScrollBarStyle (): ScrollBarStyle {
  return {
    trackSize: 8,
    trackBackgroundColor: '#333',
    trackBorderColor: '#222',
    thumbSize: 8,
    thumbBackgroundColor: '#bbb',
    thumbBorderColor: '#aaa'
  }
}
