import { IRectReadonly } from '../geometry/rect'
import { Arc as GeometryArc } from '../geometry/arc'
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
  }

  get bounds (): IRectReadonly {
    return new GeometryArc(this.#x, this.#y, this.#radius).bounds
  }

  create (path: Path2DBase): void {
    path.arc(this.#x, this.#y, this.#radius, this.#startAngle, this.#endAngle, this.#counterclockwise)
  }
}
