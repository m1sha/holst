import { Rect } from '../../core/rect'
import { Point } from '../../core/point'
import { Size } from '../../core/size'
import { Layer } from '../../core/layers'
import { ScrollBarStyle } from './scrollbar-style'
import { createArrowLeft, createArrowRight, createArrowUp, createArrowDown } from './scrollbar-helpers'

export abstract class ScrollBarDesign {
  value: number
  minValue: number
  maxValue: number
  containerSize: Size
  style: ScrollBarStyle
  layer: Layer
  splitSize: number

  constructor (value: number, minValue: number, maxValue: number, containerSize: Size, splitSize: number, style: ScrollBarStyle, layer: Layer) {
    this.value = value
    this.maxValue = maxValue
    this.minValue = minValue
    this.containerSize = containerSize
    this.style = style
    this.layer = layer
    this.splitSize = splitSize
  }

  protected abstract getTrackerRect(): Rect
  protected abstract getBackButtonRect(): Rect
  protected abstract getForwardButtonRect(): Rect
  protected abstract getThumbButtonRect(): Rect
  abstract getThumbLimitRect(): Rect
  protected abstract getBackArrowPoint (): Point
  protected abstract getForwardArrowPoint (): Point

  createTracker () {
    const rect = this.getTrackerRect()
    const { track } = this.style
    const trackStyle = { fill: track.color, stroke: track.border }
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
    const { thumbButton } = this.style
    const arrowStyle = { fill: thumbButton.color, stroke: thumbButton.border }
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
    const { thumbButton } = this.style
    const rect = this.getThumbButtonRect()
    const thumbStyle = { fill: thumbButton.color, stroke: thumbButton.border }
    return this.layer
      .createShape(thumbStyle)
      .roundRect(rect, 4)
  }

  private createArrowButton (val: '<' | '>') {
    const rect = val === '<' ? this.getBackButtonRect() : this.getForwardButtonRect()
    const { trackButton } = this.style
    return this.layer
      .createShape({ fill: trackButton.color, stroke: trackButton.border })
      .roundRect(rect, 2)
  }
}
