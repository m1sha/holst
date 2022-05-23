import { ScrollBarStyle } from './scrollbar-style'
import { createArrowLeft, createArrowRight, createArrowUp, createArrowDown } from './scrollbar-helpers'
import { Layer } from '../../layers'
import { Rect, IRect } from '../../rect'
import { Size } from '../../size'
import { Point } from '../../point'
import Shape from '../../shape'
export abstract class ScrollBar {
  protected tracker: Shape | null = null
  position: number
  limit: number
  style: ScrollBarStyle

  constructor (position: number, limit: number, style: ScrollBarStyle) {
    this.position = position ?? 0
    this.limit = limit ?? 0
    this.style = style
  }

  abstract create (layer: Layer, { width, height }: Size): void

  protected createTracker (rect: IRect, layer: Layer) {
    const { trackBackgroundColor, trackBorderColor } = this.style
    const trackStyle = { fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor }
    return layer
      .createShape(trackStyle)
      .rect(rect)
  }

  protected createArrowButton (rect: IRect, layer: Layer) {
    const { buttonBackgroundColor, buttonBorderColor } = this.style
    return layer
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .roundRect(rect, 4)
  }

  protected createThumbButton (rect: IRect, layer: Layer) {
    const thumbStyle = { fillStyle: this.style.thumbBackgroundColor, strokeStyle: this.style.thumbBorderColor }
    return layer
      .createShape(thumbStyle)
      .roundRect(rect, 8)
  }

  protected setThumbButtonHandlers (button: Shape, dir: 'x' | 'y') {
    let start = Point.zero
    let shift = Point.zero
    const { thumbBackgroundColorHover } = this.style
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
        if (dir === 'x') {
          if (e.event.x > start.x && bounds.width + bounds.x > trackerBounds.width) canMove = false
          if (e.event.x < start.x && bounds.x + 1 < trackerBounds.x) canMove = false
        }
        if (canMove) {
          button.move({ x: dir === 'x' ? point.x : 0, y: dir === 'y' ? point.y : 0 })
        }
      })
  }
}

export class HScrollBar extends ScrollBar {
  create (layer: Layer, { width, height }: Size) {
    const { trackSize, buttonBorderColor } = this.style

    this.tracker = this.createTracker(new Rect(0, height - trackSize, width - trackSize - 2, trackSize), layer)
    this.createArrowButton(new Rect(0, height - trackSize, trackSize, trackSize), layer) // Button left
    this.createArrowButton(new Rect(width - trackSize - trackSize - 2, height - trackSize, trackSize, trackSize), layer) // Button right

    let x = trackSize / 2
    const y = height - trackSize / 2
    const arrowStyle = { fillStyle: buttonBorderColor, strokeStyle: buttonBorderColor }
    createArrowLeft(layer, { x, y }, arrowStyle)

    x = width - trackSize - trackSize / 2
    createArrowRight(layer, { x, y }, arrowStyle)

    this.createHScrollThumb(layer, this.limit, height)
  }

  createHScrollThumb (scrollLayer: Layer, value: number, height: number) {
    const { thumbSize } = this.style
    const thumbButton = this.createThumbButton(
      new Rect(thumbSize + this.position, height - thumbSize, value, thumbSize),
      scrollLayer
    )

    this.setThumbButtonHandlers(thumbButton, 'x')
  }
}

export class VScrollBar extends ScrollBar {
  create (layer: Layer, { width, height }: Size) {
    const { trackSize, buttonBorderColor } = this.style

    this.tracker = this.createTracker(new Rect(width - trackSize, 0, trackSize, height - trackSize - 2), layer)
    this.createArrowButton(new Rect(width - trackSize, 0, trackSize, trackSize), layer) // Button up
    this.createArrowButton(new Rect(width - trackSize, height - trackSize - trackSize - 2, trackSize, trackSize), layer) // Button down

    const x = (width - trackSize) + trackSize / 2
    let y = trackSize / 2
    const arrowStyle = { fillStyle: buttonBorderColor, strokeStyle: buttonBorderColor }
    createArrowUp(layer, { x, y }, arrowStyle)

    y = height - trackSize - trackSize / 2
    createArrowDown(layer, { x, y }, arrowStyle)

    this.createVScrollThumb(layer, this.limit, width)
  }

  createVScrollThumb (scrollLayer: Layer, value: number, width: number) {
    const { thumbSize } = this.style
    const thumbButton = this.createThumbButton(
      new Rect(width - thumbSize, thumbSize + this.position, thumbSize, value),
      scrollLayer
    )

    this.setThumbButtonHandlers(thumbButton, 'y')
  }
}
