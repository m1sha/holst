import { IArcSegment } from '../../geometry/arc-segment'
import { Rect } from '../../geometry/rect'
import { Shape } from './shape'

export class Arc extends Shape {
  #segments: IArcSegment[]

  constructor () {
    super()
    this.#segments = []
  }

  get bounds (): Rect {
    throw new Error('Method not implemented.')
  }
}
