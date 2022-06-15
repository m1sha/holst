import { ScrollBarDesign } from './scrollbar-design'
import { Rect } from '../../rect'
import { Point } from '../../point'
import { Size } from '../../size'

export class VScrollbarDesign extends ScrollBarDesign {
  get x () {
    const { width } = this.containerSize
    const buttonHeight = this.getButtonSize().width
    return width - buttonHeight - 1
  }

  get width () {
    const buttonSize = this.getButtonSize().width
    return buttonSize
  }

  getTrackerRect (): Rect {
    const { height } = this.containerSize
    const buttonHeight = this.getButtonSize().height
    const y = buttonHeight
    const h = height - buttonHeight - 2
    return new Rect(this.x, y, this.width, h)
  }

  getBackButtonRect (): Rect {
    const x = this.x
    const y = this.splitSize
    const size = this.getButtonSize()
    return new Rect({ x, y }, size)
  }

  getForwardButtonRect (): Rect {
    const { height } = this.containerSize
    const buttonHeight = this.getButtonSize().height
    const x = this.x
    const y = height - buttonHeight - buttonHeight - 2
    const size = this.getButtonSize()

    return new Rect({ x, y }, size)
  }

  getThumbButtonRect (): Rect {
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    const r = this.getThumbLimitRect()
    const thumbSize = (this.containerSize.height / (this.maxValue - this.minValue + this.containerSize.height)) * r.height
    return new Rect(this.x, trackWidth + this.splitSize + 4 + this.value, this.width, thumbSize)
  }

  getThumbLimitRect (): Rect {
    const { width, height } = this.containerSize
    const buttonHeight = this.getButtonSize().height
    const x = width - buttonHeight - 1
    const y = buttonHeight + this.splitSize
    const h = height - buttonHeight - 2 * this.splitSize - 2 * buttonHeight - 8
    return new Rect(x, y, this.width, h)
  }

  getBackArrowPoint (): Point {
    const { width } = this.containerSize
    const buttonHeight = this.getButtonSize().height
    const x = (width - buttonHeight) + buttonHeight / 2
    const y = buttonHeight / 2
    return new Point(x, y)
  }

  getForwardArrowPoint (): Point {
    const { width, height } = this.containerSize
    const buttonHeight = this.getButtonSize().height
    const x = (width - buttonHeight) + buttonHeight / 2
    const y = height - buttonHeight - buttonHeight / 2
    return new Point(x, y)
  }

  private getButtonSize (): Size {
    const { width } = this.style.trackButton
    return { width, height: width }
  }
}
