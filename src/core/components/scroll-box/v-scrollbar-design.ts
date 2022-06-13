import { ScrollBarDesign } from './scrollbar-design'
import { Rect } from '../../rect'
import { Point } from '../../point'

export class VScrollbarDesign extends ScrollBarDesign {
  getTrackerRect (): Rect {
    const { width, height } = this.boxSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    return new Rect(width - trackWidth - 1, 0, trackWidth, height - trackWidth - 2)
  }

  getBackButtonRect (): Rect {
    const { width } = this.boxSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    return new Rect(width - trackWidth - 1, this.splitSize, trackWidth, trackWidth)
  }

  getForwardButtonRect (): Rect {
    const { width, height } = this.boxSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    return new Rect(width - trackWidth - 1, height - trackWidth - trackWidth - 2, trackWidth, trackWidth)
  }

  getThumbButtonRect (): Rect {
    const { width } = this.boxSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    return new Rect(width - trackWidth - 1, trackWidth + this.splitSize + this.position, trackWidth, this.maxValue)
  }

  getThumbLimitRect (): Rect {
    const { width, height } = this.boxSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    return new Rect(width - trackWidth - 1, trackWidth + this.splitSize, trackWidth, height - trackWidth - 2 * this.splitSize - 2 * trackWidth)
  }

  getBackArrowPoint (): Point {
    const { width } = this.boxSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    return new Point((width - trackWidth) + trackWidth / 2, trackWidth / 2)
  }

  getForwardArrowPoint (): Point {
    const { width, height } = this.boxSize
    const { trackButton } = this.style
    const trackWidth = trackButton.width
    return new Point((width - trackWidth) + trackWidth / 2, height - trackWidth - trackWidth / 2)
  }
}
