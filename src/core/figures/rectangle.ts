import { Corner4 } from '../geometry/corner4'
import { IRect, Rect, IRectReadonly } from '../geometry/rect'
import { Path2DBase } from '../path2d/path2d-base'
import { Figure } from './figure'

export class Rectangle extends Figure {
  #rect: IRect
  #corners: Corner4 | number

  constructor (rect: IRect, corners?: Corner4 | number) {
    super()
    this.#rect = rect
    this.#corners = corners ?? 0
    this.setModified()
  }

  get x (): number { return this.#rect.x }

  set x (value: number) {
    this.#rect.x = value
    this.setModified()
  }

  get y (): number { return this.#rect.y }

  set y (value: number) {
    this.#rect.y = value
    this.setModified()
  }

  get width (): number { return this.#rect.width }

  set width (value: number) {
    this.#rect.width = value
    this.setModified()
  }

  get height (): number { return this.#rect.height }

  set height (value: number) {
    this.#rect.height = value
    this.setModified()
  }

  get bounds (): IRectReadonly {
    return new Rect(this.#rect)
  }

  create (path: Path2DBase): void {
    const { x, y, width, height } = this.#rect
    if (!this.#corners) {
      path.rect(x, y, width, height)
    } else {
      const { tl, tr, br, bl }: Corner4 = typeof this.#corners === 'number'
        ? { tl: this.#corners, tr: this.#corners, br: this.#corners, bl: this.#corners }
        : this.#corners

      path.moveTo(x + tl, y)
      path.lineTo(x + width - tr, y)
      path.quadraticCurveTo(x + width, y, x + width, y + tr)
      path.lineTo(x + width, y + height - br)
      path.quadraticCurveTo(x + width, y + height, x + width - br, y + height)
      path.lineTo(x + bl, y + height)
      path.quadraticCurveTo(x, y + height, x, y + height - bl)
      path.lineTo(x, y + tl)
      path.quadraticCurveTo(x, y, x + tl, y)
    }

    this.setUnmodified()
  }
}
