import { IRectReadonly } from '../geometry/rect'
import { Radial } from '../geometry/radial'
import { Path2DBase } from '../path2d/path2d-base'
import { Figure } from './figure'
import { drawSegmentedCircle } from '../geometry/segmented-circle'

export class Circle extends Figure {
  #x: number
  #y: number
  #radius: number
  #segmentCount: number
  #smooth: number

  constructor (x: number, y: number, radius: number, segmentCount?: number, smooth?: number) {
    super()
    this.#x = x
    this.#y = y
    this.#radius = radius
    this.#segmentCount = segmentCount ?? 0
    this.#smooth = smooth ?? 1
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
    if (this.#segmentCount === 0) {
      path.arc(this.#x, this.#y, this.#radius, 0, Math.PI * 2)
    } else {
      const points = drawSegmentedCircle(this.#x, this.#y, this.#radius, this.#segmentCount, this.#smooth)
      path.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i += 2) {
        const cp = points[i]
        const { x, y } = points[i + 1]
        path.quadraticCurveTo(cp.x, cp.y, x, y)
      }
    }

    this.setUnmodified()
  }
}
