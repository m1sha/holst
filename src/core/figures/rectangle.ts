import { Rect, IRectReadonly } from '../geometry/rect'
import { Path2DBase } from '../path2d/path2d-base'
import { Figure } from './figure'

export class Rectangle extends Figure {
  #rect: Rect

  constructor (rect: Rect) {
    super()
    this.#rect = rect
  }

  get bounds (): IRectReadonly {
    return this.#rect
  }

  create (path: Path2DBase): void {
    const { x, y, width, height } = this.#rect
    path.rect(x, y, width, height)
  }
}
