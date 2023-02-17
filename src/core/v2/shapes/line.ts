import { IPoint } from '../../geometry/point'
import { Rect } from '../../geometry/rect'
import { LinearShape } from './linear-shape'

export class Line extends LinearShape {
  lineTo (p: IPoint): this {
    this.addSegemnet({ type: 'solid', x: p.x, y: p.y })
    return this
  }

  get bounds (): Rect {
    throw new Error('Method not implemented.')
  }
}
