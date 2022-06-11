import { ScrollBarStyle } from './scrollbar-style'
import { createArrowLeft, createArrowRight, createArrowUp, createArrowDown } from './scrollbar-helpers'
import { Layer } from '../../layers'
import { Rect, IRect } from '../../rect'
import { Size } from '../../size'
import { Point } from '../../point'
import Shape from '../../shape'
import { ScrollbarBehavior } from './scrollbar-behavior'
export abstract class ScrollBar {
  protected tracker: Shape | null = null
  protected backButton: Shape | null = null
  protected forwardButton: Shape | null = null
  protected thumbButton: Shape | null = null
  protected type?: 'h' | 'v'
  behavior: ScrollbarBehavior | null = null
  position: number
  maxValue: number
  style: ScrollBarStyle
  boxSize: Size
  onBackButtonClick: (() => void) | null = null
  onForwardButtonClick: (() => void) | null = null

  constructor (position: number, maxValue: number, boxSize: Size, style: ScrollBarStyle) {
    this.position = position ?? 0
    this.maxValue = maxValue ?? 0
    this.style = style
    this.boxSize = boxSize
  }

  create (layer: Layer): void {
    this.tracker = this.createTracker(this.getTrackerRect(), layer)
    this.backButton = this.createArrowButton(this.getBackButtonRect(), layer) // Button left
    this.forwardButton = this.createArrowButton(this.getForwardButtonRect(), layer) // Button right

    const { buttonBorderColor } = this.style
    const arrowStyle = { fillStyle: buttonBorderColor, strokeStyle: buttonBorderColor }
    const ps = this.getBackArrowPoint()
    const pe = this.getForwardArrowPoint()

    if (this.type === 'h') {
      createArrowLeft(layer, ps, arrowStyle)
      createArrowRight(layer, pe, arrowStyle)
    }

    if (this.type === 'v') {
      createArrowUp(layer, ps, arrowStyle)
      createArrowDown(layer, pe, arrowStyle)
    }

    this.thumbButton = this.createScrollThumb(layer)
    // this.setThumbButtonHandlers(this.type!!)

    this.behavior = new ScrollbarBehavior(this.type!!, [this.backButton, this.forwardButton, this.thumbButton, this.tracker], this.style)
    this.behavior.onBackButtonClick = () => this.onBackButtonClick && this.onBackButtonClick()
    this.behavior.onForwardButtonClick = () => this.onForwardButtonClick && this.onForwardButtonClick()
  }

  abstract getTrackerRect(): Rect
  abstract getBackButtonRect(): Rect
  abstract getForwardButtonRect(): Rect
  abstract getThumbButtonRect(): Rect
  abstract getBackArrowPoint (): Point
  abstract getForwardArrowPoint (): Point

  private createScrollThumb (scrollLayer: Layer) {
    return this.createThumbButton(this.getThumbButtonRect(), scrollLayer)
  }

  private createTracker (rect: IRect, layer: Layer) {
    const { trackBackgroundColor, trackBorderColor } = this.style
    const trackStyle = { fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor }
    return layer
      .createShape(trackStyle)
      .rect(rect)
  }

  private createArrowButton (rect: IRect, layer: Layer) {
    const { buttonBackgroundColor, buttonBorderColor } = this.style
    return layer
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .roundRect(rect, 4)
  }

  private createThumbButton (rect: IRect, layer: Layer) {
    const thumbStyle = { fillStyle: this.style.thumbBackgroundColor, strokeStyle: this.style.thumbBorderColor }
    return layer
      .createShape(thumbStyle)
      .roundRect(rect, 8)
  }
}

export class HScrollBar extends ScrollBar {
  protected type: 'h' | 'v' | undefined = 'h'

  getTrackerRect (): Rect {
    const { width, height } = this.boxSize
    const { trackSize } = this.style
    return new Rect(0, height - trackSize, width - trackSize - 2, trackSize)
  }

  getBackButtonRect (): Rect {
    const { height } = this.boxSize
    const { trackSize } = this.style
    return new Rect(0, height - trackSize, trackSize, trackSize)
  }

  getForwardButtonRect (): Rect {
    const { width, height } = this.boxSize
    const { trackSize } = this.style
    return new Rect(width - trackSize - trackSize - 2, height - trackSize, trackSize, trackSize)
  }

  getThumbButtonRect (): Rect {
    const { height } = this.boxSize
    const { thumbSize } = this.style
    return new Rect(thumbSize + this.position, height - thumbSize, this.maxValue, thumbSize)
  }

  getBackArrowPoint (): Point {
    const { height } = this.boxSize
    const { trackSize } = this.style
    return new Point(trackSize / 2, height - trackSize / 2)
  }

  getForwardArrowPoint (): Point {
    const { width, height } = this.boxSize
    const { trackSize } = this.style
    return new Point(width - trackSize - trackSize / 2, height - trackSize / 2)
  }
}

export class VScrollBar extends ScrollBar {
  protected type: 'h' | 'v' | undefined = 'v'

  getTrackerRect (): Rect {
    const { width, height } = this.boxSize
    const { trackSize } = this.style
    return new Rect(width - trackSize, 0, trackSize, height - trackSize - 2)
  }

  getBackButtonRect (): Rect {
    const { width } = this.boxSize
    const { trackSize } = this.style
    return new Rect(width - trackSize, 0, trackSize, trackSize)
  }

  getForwardButtonRect (): Rect {
    const { width, height } = this.boxSize
    const { trackSize } = this.style
    return new Rect(width - trackSize, height - trackSize - trackSize - 2, trackSize, trackSize)
  }

  getThumbButtonRect (): Rect {
    const { width } = this.boxSize
    const { thumbSize } = this.style
    return new Rect(width - thumbSize, thumbSize + this.position, thumbSize, this.maxValue)
  }

  getBackArrowPoint (): Point {
    const { width } = this.boxSize
    const { trackSize } = this.style
    return new Point((width - trackSize) + trackSize / 2, trackSize / 2)
  }

  getForwardArrowPoint (): Point {
    const { width, height } = this.boxSize
    const { trackSize } = this.style
    return new Point((width - trackSize) + trackSize / 2, height - trackSize - trackSize / 2)
  }
}
