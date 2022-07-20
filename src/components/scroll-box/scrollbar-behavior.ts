import Shape from '../../core/shape'
import { Point } from '../../core/point'
import { IRect, Rect } from '../../core/rect'
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
  limits: Rect

  onBackButtonClick: (() => void) | null = null
  onForwardButtonClick: (() => void) | null = null

  constructor (dir: 'h' | 'v', controls: Shape[], style: ScrollBarStyle, step: number, limits: Rect) {
    this.dir = dir
    this.style = style
    const [backButton, forwardButton, thumbButton, tracker] = controls
    this.backButton = backButton
    this.forwardButton = forwardButton
    this.thumbButton = thumbButton
    this.tracker = tracker
    this.step = step
    this.limits = limits

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
    // let start = Point.zero
    // const { trackSize } = this.style
    const button = this.thumbButton!!
    button
      .on('mousedown', e => {
        // start = new Point(e.event)
      })
      .on('mouseup', e => {
        // start = new Point(e.event)
      })
      .on('mousemove', e => {
        if (!this.tracker) return
        if (!e.event.pressed) return
        const point = new Point(e.event)
        // .dec(start)
        if (this.dir === 'h') {
          const e1 = this.thumbButtonRect.x <= this.limits.x
          const e2 = this.thumbButtonRect.x + this.thumbButtonRect.width >= this.limits.width
          if (e1) {
            if (this.thumbButtonRect.x > point.x) return
          }
          if (e2) {
            if (this.thumbButtonRect.x < point.x) return
          }

          this.thumbButtonRect.x = point.x
        }

        if (this.dir === 'v') this.thumbButtonRect.y = point.y
      })

    this.tracker.on('click', e => {
      const point = new Point(e.event)
      if (this.dir === 'h') {
        const e1 = this.thumbButtonRect.x <= this.limits.x
        const e2 = this.thumbButtonRect.x + this.thumbButtonRect.width >= this.limits.width
        if (e1 || e2) return
        this.thumbButtonRect.x = point.x
      }
    })
  }

  private setHover (button: Shape) {
    const oldStyle = button.copyStyle()
    const { thumbButton } = this.style
    button
      .on('hover', () => {
        button.style.fill = thumbButton.hover
      })
      .on('leave', () => {
        button.style.fill = oldStyle.fill
      })
  }
}
