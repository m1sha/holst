import { ScrollBarDesign } from './scrollbar-design'
import { Rect } from '../../rect'
import { Point } from '../../point'

export class HScrollbarDesign extends ScrollBarDesign {
  getTrackerRect (): Rect {
    const { width, height } = this.boxSize
    const { trackSize } = this.style
    return new Rect(0, height - trackSize, width - trackSize - 2, trackSize)
  }

  getBackButtonRect (): Rect {
    const { height } = this.boxSize
    const { trackSize } = this.style
    return new Rect(0, height - trackSize, trackSize, trackSize)
  }

  getForwardButtonRect (): Rect {
    const { width, height } = this.boxSize
    const { trackSize } = this.style
    return new Rect(width - trackSize - trackSize - 2, height - trackSize, trackSize, trackSize)
  }

  getThumbButtonRect (): Rect {
    const { height } = this.boxSize
    const { thumbSize } = this.style
    return new Rect(thumbSize + this.position, height - thumbSize, this.maxValue, thumbSize)
  }

  getBackArrowPoint (): Point {
    const { height } = this.boxSize
    const { trackSize } = this.style
    return new Point(trackSize / 2, height - trackSize / 2)
  }

  getForwardArrowPoint (): Point {
    const { width, height } = this.boxSize
    const { trackSize } = this.style
    return new Point(width - trackSize - trackSize / 2, height - trackSize / 2)
  }
}
