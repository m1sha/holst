import { ScrollBarStyle } from './scrollbar-style'
import { createArrowLeft, createArrowRight, createArrowUp, createArrowDown } from './scrollbar-helpers'
import { Layer } from '../../layers'
import { Rect } from '../../rect'
import { Size } from '../../size'
import { Point } from '../../point'
export abstract class ScrollBar {
  position: number
  limit: number
  protected thumbPressed: boolean
  protected firstClickPosition: Point

  constructor (position: number, limit: number) {
    this.position = position ?? 0
    this.limit = limit ?? 0
    this.thumbPressed = false
    this.firstClickPosition = new Point(0, 0)
  }

  abstract create (Layer: Layer, { width, height }: Size, style: ScrollBarStyle): void
}

export class HScrollBar extends ScrollBar {
  create (layer: Layer, { width, height }: Size, style: ScrollBarStyle) {
    const { trackSize, trackBackgroundColor, trackBorderColor, buttonBackgroundColor, buttonBorderColor } = style

    layer
      .createShape({ fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor })
      .rect(new Rect(0, height - trackSize, width - trackSize - 2, trackSize))

    const leftButton = layer // Button left
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .roundRect(new Rect(0, height - trackSize, trackSize, trackSize), 4)

    let x = trackSize / 2
    const y = height - trackSize / 2
    const arrowStyle = { fillStyle: buttonBorderColor, strokeStyle: buttonBorderColor }

    createArrowLeft(layer, { x, y }, arrowStyle)
    leftButton.on('hover', () => (leftButton.style.fillStyle = '#3f3f3f'))
    leftButton.on('leave', () => (leftButton.style.fillStyle = trackBackgroundColor))

    layer // Button right
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .rect(new Rect(width - trackSize - trackSize - 2, height - trackSize, trackSize, trackSize))

    x = width - trackSize - trackSize / 2
    createArrowRight(layer, { x, y }, arrowStyle)

    this.createHScrollThumb(layer, this.limit, height, style)
  }

  createHScrollThumb (scrollLayer: Layer, value: number, height: number, style: ScrollBarStyle) {
    const { thumbSize, thumbBackgroundColor, thumbBackgroundColorHover, thumbBorderColor } = style
    const thumbButton = scrollLayer
      .createShape({ fillStyle: thumbBackgroundColor, strokeStyle: thumbBorderColor })
      .roundRect(new Rect(thumbSize + this.position, height - thumbSize, value, thumbSize), 8)
    thumbButton.on('hover', e => {
      thumbButton.style.fillStyle = thumbBackgroundColorHover
      e.cursor = 'default'
    })
    thumbButton.on('leave', e => {
      thumbButton.style.fillStyle = thumbBackgroundColor
      e.cursor = 'default'
    })
    thumbButton.on('mousedown', e => {
      this.thumbPressed = true
      this.firstClickPosition = new Point(e.event.offsetX, e.event.offsetY)
    })
    thumbButton.on('mouseup', e => {
      this.thumbPressed = false
    })
    let old = 0
    thumbButton.on('mousemove', e => {
      if (!this.thumbPressed) return
      const x = this.firstClickPosition.x - e.event.offsetX
      old -= x
      thumbButton.move({ x: old, y: 0 })
    })
  }
}

export class VScrollBar extends ScrollBar {
  create (layer: Layer, { width, height }: Size, style: ScrollBarStyle) {
    const { trackSize, trackBackgroundColor, trackBorderColor, buttonBackgroundColor, buttonBorderColor } = style
    layer
      .createShape({ fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor })
      .rect(new Rect(width - trackSize, 0, trackSize, height - trackSize - 2))

    layer // Button up
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .rect(new Rect(width - trackSize, 0, trackSize, trackSize))

    const x = (width - trackSize) + trackSize / 2
    let y = trackSize / 2
    const arrowStyle = { fillStyle: buttonBorderColor, strokeStyle: buttonBorderColor }
    createArrowUp(layer, { x, y }, arrowStyle)

    layer // Button down
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .rect(new Rect(width - trackSize, height - trackSize - trackSize - 2, trackSize, trackSize))

    y = height - trackSize - trackSize / 2
    createArrowDown(layer, { x, y }, arrowStyle)

    this.createVScrollThumb(layer, this.limit, width, style)
  }

  createVScrollThumb (scrollLayer: Layer, value: number, width: number, style: ScrollBarStyle) {
    const { thumbSize, thumbBackgroundColor, thumbBackgroundColorHover, thumbBorderColor } = style
    const thumbButton = scrollLayer
      .createShape({ fillStyle: thumbBackgroundColor, strokeStyle: thumbBorderColor })
      .roundRect(new Rect(width - thumbSize, thumbSize + this.position, thumbSize, value), 8)

    thumbButton.on('hover', e => {
      thumbButton.style.fillStyle = thumbBackgroundColorHover
      e.cursor = 'default'
    })
    thumbButton.on('leave', e => {
      thumbButton.style.fillStyle = thumbBackgroundColor
      e.cursor = 'default'
    })
  }
}
