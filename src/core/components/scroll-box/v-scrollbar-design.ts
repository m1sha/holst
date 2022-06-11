import { ScrollBarDesign } from './scrollbar-design'
import { Rect } from '../../rect'
import { Point } from '../../point'

export class VScrollbarDesign extends ScrollBarDesign {
  getTrackerRect (): Rect {
    const { width, height } = this.boxSize
    const { trackSize } = this.style
    return new Rect(width - trackSize, 0, trackSize, height - trackSize - 2)
  }

  getBackButtonRect (): Rect {
    const { width } = this.boxSize
    const { trackSize } = this.style
    return new Rect(width - trackSize, 0, trackSize, trackSize)
  }

  getForwardButtonRect (): Rect {
    const { width, height } = this.boxSize
    const { trackSize } = this.style
    return new Rect(width - trackSize, height - trackSize - trackSize - 2, trackSize, trackSize)
  }

  getThumbButtonRect (): Rect {
    const { width } = this.boxSize
    const { thumbSize } = this.style
    return new Rect(width - thumbSize, thumbSize + this.position, thumbSize, this.maxValue)
  }

  getBackArrowPoint (): Point {
    const { width } = this.boxSize
    const { trackSize } = this.style
    return new Point((width - trackSize) + trackSize / 2, trackSize / 2)
  }

  getForwardArrowPoint (): Point {
    const { width, height } = this.boxSize
    const { trackSize } = this.style
    return new Point((width - trackSize) + trackSize / 2, height - trackSize - trackSize / 2)
  }
}
