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
  step: number

  onBackButtonClick: (() => void) | null = null
  onForwardButtonClick: (() => void) | null = null

  constructor (dir: 'h' | 'v', controls: Shape[], style: ScrollBarStyle, step: number) {
    this.dir = dir
    this.style = style
    const [backButton, forwardButton, thumbButton, tracker] = controls
    this.backButton = backButton
    this.forwardButton = forwardButton
    this.thumbButton = thumbButton
    this.tracker = tracker
    this.step = step

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
      if (this.dir === 'h') this.thumbButtonRect.x -= this.step
      else this.thumbButtonRect.y -= this.step
      if (this.onBackButtonClick) this.onBackButtonClick()
    })
  }

  private forwardButtonClick () {
    this.forwardButton.on('click', () => {
      if (this.dir === 'h') this.thumbButtonRect.x += this.step
      else this.thumbButtonRect.y += this.step
      if (this.onForwardButtonClick) this.onForwardButtonClick()
    })
  }

  private setThumbButtonHandlers () {
    let start = Point.zero
    // const { trackSize } = this.style
    const button = this.thumbButton!!
    button
      .on('mousedown', e => {
        start = new Point(e.event)
      })
      .on('mouseup', e => {
        // start = new Point(e.event)
      })
      .on('mousemove', e => {
        if (!this.tracker) return
        if (!e.event.pressed) return
        const point = new Point(e.event)
          .distance(start)
        if (this.dir === 'h') this.thumbButtonRect.x = point
        if (this.dir === 'v') this.thumbButtonRect.y = point
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
