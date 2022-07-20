import { ScrollBarDesign } from './scrollbar-design'
import { Rect } from '../../core/rect'
import { Point } from '../../core/point'
import { Size } from '../../core/size'

export class HScrollbarDesign extends ScrollBarDesign {
  get y () {
    const { height } = this.containerSize
    const buttonSize = this.getButtonSize().height
    return height - buttonSize - 1
  }

  get height () {
    const buttonSize = this.getButtonSize().height
    return buttonSize
  }

  getTrackerRect (): Rect {
    const { width } = this.containerSize
    const buttonSize = this.getButtonSize().height
    const x = buttonSize + this.splitSize
    const w = width - buttonSize - 2 - buttonSize - buttonSize - this.splitSize
    return new Rect(x, this.y, w, this.height)
  }

  getBackButtonRect (): Rect {
    const buttonSize = this.getButtonSize().height
    return new Rect(this.splitSize, this.y, buttonSize, this.height)
  }

  getForwardButtonRect (): Rect {
    const { width } = this.containerSize
    const buttonSize = this.getButtonSize().height
    return new Rect(width - buttonSize - buttonSize - 2, this.y, buttonSize, this.height)
  }

  getThumbButtonRect (): Rect {
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    const r = this.getThumbLimitRect()
    const thumbSize = (this.containerSize.width / (this.maxValue - this.minValue + this.containerSize.width)) * r.width
    return new Rect(trackWidth + this.splitSize + 4 + this.value, this.y, thumbSize, this.height)
  }

  getThumbLimitRect (): Rect {
    const { trackButton } = this.style
    const { width } = this.containerSize
    const trackWidth = trackButton.width
    const x = trackWidth + this.splitSize + 4
    const w = width - trackWidth - 2 * this.splitSize - trackWidth - trackWidth - this.splitSize - 6
    return new Rect(x, this.y, w, this.height)
  }

  getBackArrowPoint (): Point {
    const { height } = this.containerSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    const x = trackWidth / 2
    const y = height - trackWidth / 2
    return new Point(x, y)
  }

  getForwardArrowPoint (): Point {
    const { width, height } = this.containerSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    return new Point(width - trackWidth - trackWidth / 2, height - trackWidth / 2)
  }

  private getButtonSize (): Size {
    const { width } = this.style.trackButton
    return { width, height: width }
  }
}
