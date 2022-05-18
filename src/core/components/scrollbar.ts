import { Viewport } from '../viewport'
import { Scene } from '../scene'
import { Rect } from '../rect'
import { Layer } from '../layers'
import { arrowLeft, arrowRight, arrowUp, arrowDown } from './scrollbar-helpers'

interface ScrollBarStyle {
  trackSize: number
  trackBackgroundColor: string
  trackBorderColor: string
  thumbSize: number
  thumbBackgroundColor: string
  thumbBorderColor: string
  buttonBackgroundColor: string
  buttonBorderColor: string
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
    const { trackSize, trackBackgroundColor, trackBorderColor, buttonBackgroundColor, buttonBorderColor } = this.style
    const { width, height } = this.viewport
    scrollLayer
      .createShape({ fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor })
      .rect(new Rect(0, height - trackSize, width - trackSize - 2, trackSize))

    scrollLayer // Button left
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .rect(new Rect(0, height - trackSize, trackSize, trackSize))

    let x = trackSize / 2
    const y = height - trackSize / 2
    const arrowStyle = { fillStyle: buttonBorderColor, strokeStyle: buttonBorderColor }

    arrowLeft(scrollLayer, { x, y }, arrowStyle)

    scrollLayer // Button right
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .rect(new Rect(width - trackSize - trackSize - 2, height - trackSize, trackSize, trackSize))

    x = width - trackSize - trackSize / 2
    arrowRight(scrollLayer, { x, y }, arrowStyle)

    this.createHScrollThumb(scrollLayer, 60)
  }

  private createVScroll (scrollLayer: Layer) {
    const { trackSize, trackBackgroundColor, trackBorderColor, buttonBackgroundColor, buttonBorderColor } = this.style
    const { width, height } = this.viewport
    scrollLayer
      .createShape({ fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor })
      .rect(new Rect(width - trackSize, 0, trackSize, height - trackSize - 2))

    scrollLayer // Button up
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .rect(new Rect(width - trackSize, 0, trackSize, trackSize))

    const x = (width - trackSize) + trackSize / 2
    let y = trackSize / 2
    const arrowStyle = { fillStyle: buttonBorderColor, strokeStyle: buttonBorderColor }
    arrowUp(scrollLayer, { x, y }, arrowStyle)

    scrollLayer // Button down
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .rect(new Rect(width - trackSize, height - trackSize - trackSize - 2, trackSize, trackSize))

    y = height - trackSize - trackSize / 2
    arrowDown(scrollLayer, { x, y }, arrowStyle)

    this.createVScrollThumb(scrollLayer, 60)
  }

  createHScrollThumb (scrollLayer: Layer, value: number) {
    const { thumbSize, thumbBackgroundColor, thumbBorderColor } = this.style
    const { height } = this.viewport
    scrollLayer
      .createShape({ fillStyle: thumbBackgroundColor, strokeStyle: thumbBorderColor })
      .roundRect(new Rect(thumbSize, height - thumbSize, value, thumbSize), 8)
  }

  createVScrollThumb (scrollLayer: Layer, value: number) {
    const { thumbSize, thumbBackgroundColor, thumbBorderColor } = this.style
    const { width } = this.viewport
    scrollLayer
      .createShape({ fillStyle: thumbBackgroundColor, strokeStyle: thumbBorderColor })
      .roundRect(new Rect(width - thumbSize, thumbSize, thumbSize, value), 8)
  }
}

function defaultScrollBarStyle (): ScrollBarStyle {
  return {
    trackSize: 20,
    trackBackgroundColor: '#f4f4f4',
    trackBorderColor: '#e0e0e0',
    thumbSize: 20,
    thumbBackgroundColor: '#c9c9c9',
    thumbBorderColor: '#f2f1f1',
    buttonBackgroundColor: '#e6e6e6',
    buttonBorderColor: '#c0c0c0'
  }
}
