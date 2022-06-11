import Shape from '../../shape'
import { Point } from '../../point'
import { IRect } from '../../rect'
import { ScrollBarStyle } from './scrollbar-style'

export class ScrollbarBehavior {
  readonly dir: 'h' | 'v'
  protected backButton: Shape
  protected forwardButton: Shape
  protected thumbButton: Shape
  protected tracker: Shape
  thumbButtonRect: IRect
  style: ScrollBarStyle

  onBackButtonClick: (() => void) | null = null
  onForwardButtonClick: (() => void) | null = null

  constructor (dir: 'h' | 'v', controls: Shape[], style: ScrollBarStyle) {
    this.dir = dir
    this.style = style
    const [backButton, forwardButton, thumbButton, tracker] = controls
    this.backButton = backButton
    this.forwardButton = forwardButton
    this.thumbButton = thumbButton
    this.tracker = tracker

    this.thumbButtonRect = this.thumbButton.roundRects[0] as IRect

    this.setHover(this.backButton)
    this.setHover(this.forwardButton)
    this.setHover(this.thumbButton)
    this.setThumbButtonHandlers()
    this.backButtonClick()
    this.forwardButtonClick()
  }

  private backButtonClick () {
    this.backButton.on('click', () => {
      if (this.dir === 'h') this.thumbButtonRect.x--
      else this.thumbButtonRect.y--
      if (this.onBackButtonClick) this.onBackButtonClick()
    })
  }

  private forwardButtonClick () {
    this.forwardButton.on('click', () => {
      if (this.dir === 'h') this.thumbButtonRect.x++
      else this.thumbButtonRect.y++
      if (this.onForwardButtonClick) this.onForwardButtonClick()
    })
  }

  private setThumbButtonHandlers () {
    let start = Point.zero
    let shift = Point.zero
    const { trackSize } = this.style
    const button = this.thumbButton!!
    button
      .on('mousedown', e => {
        start = new Point(e.event)
      })
      .on('mouseup', () => {
        shift = button.shift
      })
      .on('mousemove', e => {
        if (!this.tracker) return
        if (!e.event.pressed) return
        const point = new Point(e.event)
          .dec(start)
          .add(shift)
        const trackerBounds = this.tracker.bounds
        const bounds = button.bounds
        let canMove = true
        if (this.dir === 'h') {
          if (e.event.x > start.x && bounds.width + bounds.x + trackSize + 2 > trackerBounds.width) canMove = false
          if (e.event.x < start.x && bounds.x < trackerBounds.x + trackSize + 2) canMove = false
        }
        if (canMove) {
          button.move({ x: this.dir === 'h' ? point.x : 0, y: this.dir === 'v' ? point.y : 0 })
        }
      })
  }

  private setHover (button: Shape) {
    const oldStyle = button.copyStyle()
    const { thumbBackgroundColorHover } = this.style
    button
      .on('hover', () => {
        button.style.fillStyle = thumbBackgroundColorHover
      })
      .on('leave', () => {
        button.style.fillStyle = oldStyle.fillStyle
      })
  }
}
