import { IRectReadonly } from 'core/geometry/rect'
import { Path2DBase } from 'core/path2d/path2d-base'
import { Figure } from './figure'

export class QuadraticCurve extends Figure {
  #cpx: number
  #cpy: number
  #x: number
  #y: number

  constructor (cpx: number, cpy: number, x: number, y: number) {
    super()
    this.#cpx = cpx
    this.#cpy = cpy
    this.#x = x
    this.#y = y
  }

  get bounds (): IRectReadonly {
    throw new Error('Method not implemented.')
  }

  create (path: Path2DBase): void {
    path.quadraticCurveTo(this.#cpx, this.#cpy, this.#x, this.#y)
  }
}
