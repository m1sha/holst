import { calcBounds } from '../../utils/utils'
import { IPoint } from '../geometry/point'
import { IRectReadonly } from '../geometry/rect'
import { Path2DBase } from '../path2d/path2d-base'
import { Figure } from './figure'

type LineSegment = { point: IPoint, type: 'line' | 'gap' }

export class Line<T> extends Figure {
  private isClosed: boolean = false
  #segments: LineSegment[] = []
  #sender: T

  constructor (obj: T) {
    super()
    this.#sender = obj
  }

  begin (point: IPoint): this {
    this.#segments.push({ point, type: 'line' })
    return this
  }

  segment (point: IPoint): this {
    this.#segments.push({ point, type: 'line' })
    return this
  }

  gap (point: IPoint): this {
    this.#segments.push({ point, type: 'gap' })
    return this
  }

  close () {
    this.isClosed = true
  }

  end (): T {
    return this.#sender
  }

  get bounds (): IRectReadonly {
    return calcBounds(this.#segments.map(p => p.point))
  }

  create (path: Path2DBase): void {
    if (this.#segments.length === 0) return

    path.moveTo(this.#segments[0].point.x, this.#segments[0].point.y)
    for (let i = 1; i < this.#segments.length; i++) {
      if (this.#segments[i - 1].type === 'gap') path.moveTo(this.#segments[i - 1].point.x, this.#segments[i - 1].point.y)
      if (this.#segments[i].type === 'line') path.lineTo(this.#segments[i].point.x, this.#segments[i].point.y)
    }

    if (this.isClosed) path.closePath()
  }
}
