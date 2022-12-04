import { IRectReadonly } from '../geometry/rect'
import { Radial } from '../geometry/radial'
import { Path2DBase } from '../path2d/path2d-base'
import { Figure } from './figure'

export class Arc extends Figure {
  #x: number
  #y: number
  #radius: number
  #startAngle: number
  #endAngle: number
  #counterclockwise?: boolean

  constructor (x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean) {
    super()
    this.#x = x
    this.#y = y
    this.#radius = radius
    this.#startAngle = startAngle
    this.#endAngle = endAngle
    this.#counterclockwise = counterclockwise
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

  get startAngle (): number { return this.#startAngle }

  set startAngle (value: number) {
    this.#startAngle = value
    this.setModified()
  }

  get endAngle (): number { return this.#endAngle }

  set endAngle (value: number) {
    this.#endAngle = value
    this.setModified()
  }

  get bounds (): IRectReadonly {
    return new Radial(this.#x, this.#y, this.#radius, this.#radius, 0, this.startAngle, this.endAngle).bounds
  }

  create (path: Path2DBase): void {
    path.arc(this.#x, this.#y, this.#radius, this.#startAngle, this.#endAngle, this.#counterclockwise)
    this.setUnmodified()
  }
}
