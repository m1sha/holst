import { IRect, Rect, IRectReadonly } from '../geometry/rect'
import { Path2DBase } from '../path2d/path2d-base'
import { Figure } from './figure'

export class Rectangle extends Figure {
  #rect: IRect

  constructor (rect: IRect) {
    super()
    this.#rect = rect
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
    path.rect(x, y, width, height)
    this.setUnmodified()
  }
}
