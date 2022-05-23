import { ScrollBarStyle } from './scrollbar-style'
import { createArrowLeft, createArrowRight, createArrowUp, createArrowDown } from './scrollbar-helpers'
import { Layer } from '../../layers'
import { Rect, IRect } from '../../rect'
import { Size } from '../../size'
import { Point } from '../../point'
import Shape from '../../shape'
export abstract class ScrollBar {
  protected tracker: Shape | null = null
  protected backButton: Shape | null = null
  protected forwardButton: Shape | null = null
  protected thumbButton: Shape | null = null
  protected type?: 'h' | 'v'
  position: number
  limit: number
  style: ScrollBarStyle

  constructor (position: number, limit: number, style: ScrollBarStyle) {
    this.position = position ?? 0
    this.limit = limit ?? 0
    this.style = style
  }

  create (layer: Layer, { width, height }: Size): void {
    this.tracker = this.createTracker(this.getTrackerRect({ width, height }), layer)
    this.backButton = this.createArrowButton(this.getBackButtonRect({ width, height }), layer) // Button left
    this.forwardButton = this.createArrowButton(this.getForwardButtonRect({ width, height }), layer) // Button right

    const { buttonBorderColor } = this.style
    const arrowStyle = { fillStyle: buttonBorderColor, strokeStyle: buttonBorderColor }
    const ps = this.getBackArrowPoint({ width, height })
    const pe = this.getForwardArrowPoint({ width, height })

    if (this.type === 'h') {
      createArrowLeft(layer, ps, arrowStyle)
      createArrowRight(layer, pe, arrowStyle)
    }

    if (this.type === 'v') {
      createArrowUp(layer, ps, arrowStyle)
      createArrowDown(layer, pe, arrowStyle)
    }

    this.thumbButton = this.createScrollThumb(layer, { width, height })
    this.setThumbButtonHandlers(this.type!!)
  }

  abstract getTrackerRect({ width, height }: Size): Rect
  abstract getBackButtonRect({ width, height }: Size): Rect
  abstract getForwardButtonRect({ width, height }: Size): Rect
  abstract getThumbButtonRect({ width, height }: Size): Rect
  abstract getBackArrowPoint ({ width, height }: Size): Point
  abstract getForwardArrowPoint ({ width, height }: Size): Point

  private createScrollThumb (scrollLayer: Layer, { width, height }: Size) {
    return this.createThumbButton(this.getThumbButtonRect({ width, height }), scrollLayer)
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

  private setThumbButtonHandlers (dir: 'h' | 'v') {
    let start = Point.zero
    let shift = Point.zero
    const { thumbBackgroundColorHover, trackSize } = this.style
    const button = this.thumbButton!!
    const oldStyle = button.copyStyle()
    button
      .on('hover', () => {
        button.style.fillStyle = thumbBackgroundColorHover
      })
      .on('leave', () => {
        button.style.fillStyle = oldStyle.fillStyle
      })
      .on('mousedown', e => {
        start = new Point(e.event)
      })
      .on('mouseup', () => {
        shift = button.shift
      })
      .on('mousemove', e => {
        if (!this.tracker) return
        if (!e.event.pressed) return
        const point = new Point(e.event)
          .dec(start)
          .add(shift)
        const trackerBounds = this.tracker.bounds
        const bounds = button.bounds
        let canMove = true
        if (dir === 'h') {
          if (e.event.x > start.x && bounds.width + bounds.x + trackSize + 2 > trackerBounds.width) canMove = false
          if (e.event.x < start.x && bounds.x < trackerBounds.x + trackSize + 2) canMove = false
        }
        if (canMove) {
          button.move({ x: dir === 'h' ? point.x : 0, y: dir === 'v' ? point.y : 0 })
        }
      })
  }
}

export class HScrollBar extends ScrollBar {
  protected type: 'h' | 'v' | undefined = 'h'

  getTrackerRect ({ width, height }: Size): Rect {
    const { trackSize } = this.style
    return new Rect(0, height - trackSize, width - trackSize - 2, trackSize)
  }

  getBackButtonRect ({ height }: Size): Rect {
    const { trackSize } = this.style
    return new Rect(0, height - trackSize, trackSize, trackSize)
  }

  getForwardButtonRect ({ width, height }: Size): Rect {
    const { trackSize } = this.style
    return new Rect(width - trackSize - trackSize - 2, height - trackSize, trackSize, trackSize)
  }

  getThumbButtonRect ({ height }: Size): Rect {
    const { thumbSize } = this.style
    return new Rect(thumbSize + this.position, height - thumbSize, this.limit, thumbSize)
  }

  getBackArrowPoint ({ height }: Size): Point {
    const { trackSize } = this.style
    return new Point(trackSize / 2, height - trackSize / 2)
  }

  getForwardArrowPoint ({ width, height }: Size): Point {
    const { trackSize } = this.style
    return new Point(width - trackSize - trackSize / 2, height - trackSize / 2)
  }
}

export class VScrollBar extends ScrollBar {
  protected type: 'h' | 'v' | undefined = 'v'

  getTrackerRect ({ width, height }: Size): Rect {
    const { trackSize } = this.style
    return new Rect(width - trackSize, 0, trackSize, height - trackSize - 2)
  }

  getBackButtonRect ({ width }: Size): Rect {
    const { trackSize } = this.style
    return new Rect(width - trackSize, 0, trackSize, trackSize)
  }

  getForwardButtonRect ({ width, height }: Size): Rect {
    const { trackSize } = this.style
    return new Rect(width - trackSize, height - trackSize - trackSize - 2, trackSize, trackSize)
  }

  getThumbButtonRect ({ width }: Size): Rect {
    const { thumbSize } = this.style
    return new Rect(width - thumbSize, thumbSize + this.position, thumbSize, this.limit)
  }

  getBackArrowPoint ({ width }: Size): Point {
    const { trackSize } = this.style
    return new Point((width - trackSize) + trackSize / 2, trackSize / 2)
  }

  getForwardArrowPoint ({ width, height }: Size): Point {
    const { trackSize } = this.style
    return new Point((width - trackSize) + trackSize / 2, height - trackSize - trackSize / 2)
  }
}
