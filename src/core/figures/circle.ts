import { IRectReadonly } from '../geometry/rect'
import { Radial } from '../geometry/radial'
import { Path2DBase } from '../path2d/path2d-base'
import { Figure } from './figure'

export class Circle extends Figure {
  #x: number
  #y: number
  #radius: number

  constructor (x: number, y: number, radius: number) {
    super()
    this.#x = x
    this.#y = y
    this.#radius = radius
    this.setModified()
  }

  get x (): number { return this.#x }

  set x (value: number) {
    this.#x = value
    this.setModified()
  }

  get y (): number { return this.#y }

  set y (value: number) {
    this.#y = value
    this.setModified()
  }

  get radius (): number { return this.#radius }

  set radius (value: number) {
    this.#radius = value
    this.setModified()
  }

  get bounds (): IRectReadonly {
    return new Radial(this.#x, this.#y, this.#radius, this.#radius).bounds
  }

  create (path: Path2DBase): void {
    path.arc(this.#x, this.#y, this.#radius, 0, Math.PI * 2)
    this.setUnmodified()
  }
}
