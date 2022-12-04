import { IRectReadonly } from '../geometry/rect'
import { Radial } from '../geometry/radial'
import { Path2DBase } from '../path2d/path2d-base'
import { Figure } from './figure'

export class Ellipse extends Figure {
  #x: number
  #y: number
  #radiusX: number
  #radiusY: number
  #rotation: number
  #startAngle: number
  #endAngle: number
  #counterclockwise?: boolean

  constructor (x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean) {
    super()
    this.#x = x
    this.#y = y
    this.#radiusX = radiusX
    this.#radiusY = radiusY
    this.#rotation = rotation
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

  get radiusX (): number { return this.#radiusX }

  set radiusX (value: number) {
    this.#radiusX = value
    this.setModified()
  }

  get radiusY (): number { return this.#radiusY }

  set radiusY (value: number) {
    this.#radiusY = value
    this.setModified()
  }

  get rotation (): number { return this.#rotation }

  set rotation (value: number) {
    this.#rotation = value
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
    return new Radial(this.#x, this.#y, this.#radiusX, this.#radiusY, this.#rotation, this.#startAngle, this.#endAngle).bounds
  }

  create (path: Path2DBase): void {
    path.ellipse(this.#x, this.#y, this.#radiusX, this.#radiusY, this.#rotation, this.#startAngle, this.#endAngle, this.#counterclockwise)
    this.setUnmodified()
  }
}
