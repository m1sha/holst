import { Shape } from './shape'
import { IPoint } from '../../geometry/point'
import { ILineSegment } from '../../geometry/line-segment'

export abstract class LinearShape extends Shape {
  #segments: ILineSegment[]
  #closed: boolean

  constructor () {
    super()
    this.#segments = []
    this.#closed = false
  }

  moveTo (p: IPoint): this {
    this.#segments.push({ type: 'gap', x: p.x, y: p.y })
    this.propertyChanged()
    return this
  }

  close (): this {
    this.#closed = true
    this.propertyChanged()
    return this
  }

  unclose (): this {
    this.#closed = false
    this.propertyChanged()
    return this
  }

  get isClosedPath (): boolean {
    return this.#closed
  }

  get segments (): Readonly<Readonly<ILineSegment>[]> {
    return this.#segments
  }

  protected addSegemnet (segemnet: ILineSegment) {
    this.#segments.push(segemnet)
    this.propertyChanged()
    return this
  }
}
