import { ScrollBarStyle } from './scrollbar-style'
import { createArrowLeft, createArrowRight, createArrowUp, createArrowDown } from './scrollbar-helpers'
import { Layer } from '../../layers'
import { Rect, IRect } from '../../rect'
import { Size } from '../../size'
import { Point } from '../../point'
import Shape from '../../shape'
export abstract class ScrollBar {
  position: number
  limit: number

  constructor (position: number, limit: number) {
    this.position = position ?? 0
    this.limit = limit ?? 0
  }

  abstract create (layer: Layer, { width, height }: Size, style: ScrollBarStyle): void

  protected createTracker (rect: IRect, layer: Layer, style: ScrollBarStyle) {
    const trackStyle = { fillStyle: style.trackBackgroundColor, strokeStyle: style.trackBorderColor }
    layer
      .createShape(trackStyle)
      .rect(rect)
  }

  protected createArrowButton (rect: IRect, layer: Layer, style: ScrollBarStyle) {
    const { buttonBackgroundColor, buttonBorderColor } = style
    layer
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .roundRect(rect, 4)
  }

  protected createThumbButton (rect: IRect, layer: Layer, style: ScrollBarStyle) {
    const thumbStyle = { fillStyle: style.thumbBackgroundColor, strokeStyle: style.thumbBorderColor }
    return layer
      .createShape(thumbStyle)
      .roundRect(rect, 8)
  }

  protected setThumbButtonHandlers (button: Shape, style: ScrollBarStyle, dir: 'x' | 'y') {
    let start = Point.zero
    let shift = Point.zero
    const { thumbBackgroundColorHover } = style
    const oldStyle = button.copyStyle()
    button
      .on('hover', () => {
        button.style.fillStyle = thumbBackgroundColorHover
      })
      .on('leave', () => {
        button.style.fillStyle = oldStyle.fillStyle
      })
      .on('mousedown', e => {
        const { offsetX, offsetY } = e.event
        start = new Point(offsetX, offsetY)
      })
      .on('mouseup', () => {
        shift = button.shift
      })
      .on('mousemove', e => {
        if (!e.pressed) return
        const { offsetX, offsetY } = e.event
        const point = new Point(offsetX, offsetY)
          .dec(start)
          .add(shift)
        button.move({ x: dir === 'x' ? point.x : 0, y: dir === 'y' ? point.y : 0 })
      })
  }
}

export class HScrollBar extends ScrollBar {
  create (layer: Layer, { width, height }: Size, style: ScrollBarStyle) {
    const { trackSize, buttonBorderColor } = style

    this.createTracker(new Rect(0, height - trackSize, width - trackSize - 2, trackSize), layer, style)
    this.createArrowButton(new Rect(0, height - trackSize, trackSize, trackSize), layer, style) // Button left
    this.createArrowButton(new Rect(width - trackSize - trackSize - 2, height - trackSize, trackSize, trackSize), layer, style) // Button right

    let x = trackSize / 2
    const y = height - trackSize / 2
    const arrowStyle = { fillStyle: buttonBorderColor, strokeStyle: buttonBorderColor }
    createArrowLeft(layer, { x, y }, arrowStyle)

    x = width - trackSize - trackSize / 2
    createArrowRight(layer, { x, y }, arrowStyle)

    this.createHScrollThumb(layer, this.limit, height, style)
  }

  createHScrollThumb (scrollLayer: Layer, value: number, height: number, style: ScrollBarStyle) {
    const { thumbSize } = style
    const thumbButton = this.createThumbButton(
      new Rect(thumbSize + this.position, height - thumbSize, value, thumbSize),
      scrollLayer,
      style
    )

    this.setThumbButtonHandlers(thumbButton, style, 'x')
  }
}

export class VScrollBar extends ScrollBar {
  create (layer: Layer, { width, height }: Size, style: ScrollBarStyle) {
    const { trackSize, buttonBorderColor } = style

    this.createTracker(new Rect(width - trackSize, 0, trackSize, height - trackSize - 2), layer, style)
    this.createArrowButton(new Rect(width - trackSize, 0, trackSize, trackSize), layer, style) // Button up
    this.createArrowButton(new Rect(width - trackSize, height - trackSize - trackSize - 2, trackSize, trackSize), layer, style) // Button down

    const x = (width - trackSize) + trackSize / 2
    let y = trackSize / 2
    const arrowStyle = { fillStyle: buttonBorderColor, strokeStyle: buttonBorderColor }
    createArrowUp(layer, { x, y }, arrowStyle)

    y = height - trackSize - trackSize / 2
    createArrowDown(layer, { x, y }, arrowStyle)

    this.createVScrollThumb(layer, this.limit, width, style)
  }

  createVScrollThumb (scrollLayer: Layer, value: number, width: number, style: ScrollBarStyle) {
    const { thumbSize } = style
    const thumbButton = this.createThumbButton(
      new Rect(width - thumbSize, thumbSize + this.position, thumbSize, value),
      scrollLayer,
      style
    )

    this.setThumbButtonHandlers(thumbButton, style, 'y')
  }
}
