import { ScrollBarStyle } from './scrollbar-style'
import { arrowLeft, arrowRight, arrowUp, arrowDown } from './scrollbar-helpers'
import { Layer } from '../../layers'
import { Rect } from '../../rect'
import { Size } from '../../size'
export abstract class ScrollBar {
  position: number
  limit: number

  constructor (position: number, limit: number) {
    this.position = position ?? 0
    this.limit = limit ?? 0
  }

  abstract create (Layer: Layer, { width, height }: Size, style: ScrollBarStyle): void
}

export class HScrollBar extends ScrollBar {
  create (layer: Layer, { width, height }: Size, style: ScrollBarStyle) {
    const { trackSize, trackBackgroundColor, trackBorderColor, buttonBackgroundColor, buttonBorderColor } = style

    layer
      .createShape({ fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor })
      .rect(new Rect(0, height - trackSize, width - trackSize - 2, trackSize))

    layer // Button left
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .rect(new Rect(0, height - trackSize, trackSize, trackSize))

    let x = trackSize / 2
    const y = height - trackSize / 2
    const arrowStyle = { fillStyle: buttonBorderColor, strokeStyle: buttonBorderColor }

    arrowLeft(layer, { x, y }, arrowStyle)

    layer // Button right
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .rect(new Rect(width - trackSize - trackSize - 2, height - trackSize, trackSize, trackSize))

    x = width - trackSize - trackSize / 2
    arrowRight(layer, { x, y }, arrowStyle)

    this.createHScrollThumb(layer, this.limit, height, style)
  }

  createHScrollThumb (scrollLayer: Layer, value: number, height: number, style: ScrollBarStyle) {
    const { thumbSize, thumbBackgroundColor, thumbBorderColor } = style
    scrollLayer
      .createShape({ fillStyle: thumbBackgroundColor, strokeStyle: thumbBorderColor })
      .roundRect(new Rect(thumbSize + this.position, height - thumbSize, value, thumbSize), 8)
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
    arrowUp(layer, { x, y }, arrowStyle)

    layer // Button down
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .rect(new Rect(width - trackSize, height - trackSize - trackSize - 2, trackSize, trackSize))

    y = height - trackSize - trackSize / 2
    arrowDown(layer, { x, y }, arrowStyle)

    this.createVScrollThumb(layer, this.limit, width, style)
  }

  createVScrollThumb (scrollLayer: Layer, value: number, width: number, style: ScrollBarStyle) {
    const { thumbSize, thumbBackgroundColor, thumbBorderColor } = style
    scrollLayer
      .createShape({ fillStyle: thumbBackgroundColor, strokeStyle: thumbBorderColor })
      .roundRect(new Rect(width - thumbSize, thumbSize + this.position, thumbSize, value), 8)
  }
}
