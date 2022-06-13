import { Rect } from '../../rect'
import { Point } from '../../point'
import { Size } from '../../size'
import { Layer } from '../../layers'
import { ScrollBarStyle } from './scrollbar-style'
import { createArrowLeft, createArrowRight, createArrowUp, createArrowDown } from './scrollbar-helpers'

export abstract class ScrollBarDesign {
  position: number
  maxValue: number
  boxSize: Size
  style: ScrollBarStyle
  layer: Layer
  splitSize: number

  constructor (position: number, maxValue: number, boxSize: Size, splitSize: number, style: ScrollBarStyle, layer: Layer) {
    this.position = position
    this.maxValue = maxValue
    this.boxSize = boxSize
    this.style = style
    this.layer = layer
    this.splitSize = splitSize
  }

  protected abstract getTrackerRect(): Rect
  protected abstract getBackButtonRect(): Rect
  protected abstract getForwardButtonRect(): Rect
  protected abstract getThumbButtonRect(): Rect
  protected abstract getBackArrowPoint (): Point
  protected abstract getForwardArrowPoint (): Point

  createTracker () {
    const rect = this.getTrackerRect()
    const { trackBackgroundColor, trackBorderColor } = this.style
    const trackStyle = { fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor }
    return this.layer
      .createShape(trackStyle)
      .rect(rect)
  }

  createBackArrowButton () {
    return this.createArrowButton('<')
  }

  createForwardArrowButton () {
    return this.createArrowButton('>')
  }

  createArrows (type: 'h' | 'v') {
    const { buttonBorderColor } = this.style
    const arrowStyle = { fillStyle: buttonBorderColor, strokeStyle: buttonBorderColor }
    const ps = this.getBackArrowPoint()
    const pe = this.getForwardArrowPoint()

    if (type === 'h') {
      createArrowLeft(this.layer, ps, arrowStyle)
      createArrowRight(this.layer, pe, arrowStyle)
    }

    if (type === 'v') {
      createArrowUp(this.layer, ps, arrowStyle)
      createArrowDown(this.layer, pe, arrowStyle)
    }
  }

  createThumbButton () {
    const rect = this.getThumbButtonRect()
    const thumbStyle = { fillStyle: this.style.thumbBackgroundColor, strokeStyle: this.style.thumbBorderColor }
    return this.layer
      .createShape(thumbStyle)
      .roundRect(rect, 8)
  }

  private createArrowButton (val: '<' | '>') {
    const rect = val === '<' ? this.getBackButtonRect() : this.getForwardButtonRect()
    const { buttonBackgroundColor, buttonBorderColor } = this.style
    return this.layer
      .createShape({ fillStyle: buttonBackgroundColor, strokeStyle: buttonBorderColor })
      .roundRect(rect, 4)
  }
}
