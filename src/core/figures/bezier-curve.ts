import { IRectReadonly } from 'core/geometry/rect'
import { Path2DBase } from 'core/path2d/path2d-base'
import { Figure } from './figure'

export class BezierCurve extends Figure {
  #cp1x: number
  #cp1y: number
  #cp2x: number
  #cp2y: number
  #x: number
  #y: number

  constructor (cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
    super()
    this.#cp1x = cp1x
    this.#cp1y = cp1y
    this.#cp2x = cp2x
    this.#cp2y = cp2y
    this.#x = x
    this.#y = y
  }

  get bounds (): IRectReadonly {
    throw new Error('Method not implemented.')
  }

  create (path: Path2DBase): void {
    path.bezierCurveTo(this.#cp1x, this.#cp1y, this.#cp2x, this.#cp2y, this.#x, this.#y)
  }
}
