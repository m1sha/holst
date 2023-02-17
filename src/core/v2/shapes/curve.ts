import { IPoint } from '../../geometry/point'
import { Rect } from '../../geometry/rect'
import { LinearShape } from './linear-shape'

export class Curve extends LinearShape {
  bezierCurveTo (cp1: IPoint, cp2: IPoint, p: IPoint): this {
    this.addSegemnet({ type: 'solid', x: p.x, y: p.y, cp1x: cp1.x, cp1y: cp1.y, cp2x: cp2.x, cp2y: cp2.y })
    return this
  }

  quadraticCurveTo (cp: IPoint, p: IPoint): this {
    this.addSegemnet({ type: 'solid', x: p.x, y: p.y, cp1x: cp.x, cp1y: cp.y })
    return this
  }

  get bounds (): Rect {
    throw new Error('Method not implemented.')
  }
}
