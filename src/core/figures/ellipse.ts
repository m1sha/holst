import { IRectReadonly } from '../geometry/rect'
import { Ellipse as GeometryEllipse } from '../geometry/ellipse'
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
  }

  get bounds (): IRectReadonly {
    return new GeometryEllipse(this.#x, this.#y, this.#radiusX, this.#radiusY).bounds
  }

  create (path: Path2DBase): void {
    path.ellipse(this.#x, this.#y, this.#radiusX, this.#radiusY, this.#rotation, this.#startAngle, this.#endAngle, this.#counterclockwise)
  }
}
