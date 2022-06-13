import { ScrollBarDesign } from './scrollbar-design'
import { Rect } from '../../rect'
import { Point } from '../../point'

export class HScrollbarDesign extends ScrollBarDesign {
  getTrackerRect (): Rect {
    const { width, height } = this.boxSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    return new Rect(trackWidth + this.splitSize, height - trackWidth - 1, width - trackWidth - 2 - trackWidth - trackWidth - this.splitSize, trackWidth)
  }

  getBackButtonRect (): Rect {
    const { height } = this.boxSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    return new Rect(this.splitSize, height - trackWidth - 1, trackWidth, trackWidth)
  }

  getForwardButtonRect (): Rect {
    const { width, height } = this.boxSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    return new Rect(width - trackWidth - trackWidth - 2, height - trackWidth - 1, trackWidth, trackWidth)
  }

  getThumbButtonRect (): Rect {
    const { height } = this.boxSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    return new Rect(trackWidth + this.splitSize + this.position, height - trackWidth - 1, this.maxValue, trackWidth)
  }

  getThumbLimitRect (): Rect {
    const { trackButton } = this.style
    const { height, width } = this.boxSize
    const trackWidth = trackButton.width
    const x = trackWidth + this.splitSize + 2
    const y = height - trackWidth - 1
    const w = width - trackWidth - 2 * this.splitSize - trackWidth
    const h = trackWidth
    return new Rect(x, y, w, h)
  }

  getBackArrowPoint (): Point {
    const { height } = this.boxSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    const x = trackWidth / 2
    const y = height - trackWidth / 2
    return new Point(x, y)
  }

  getForwardArrowPoint (): Point {
    const { width, height } = this.boxSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    return new Point(width - trackWidth - trackWidth / 2, height - trackWidth / 2)
  }
}
