import { Gradient } from './gradient'
import { IPoint } from '../geometry/point'
import { ColorStop } from './color-stop'

export class ConicGradient extends Gradient {
  point: IPoint
  angle: number

  constructor (start: IPoint, angle: number, stops?: ColorStop[]) {
    super(stops)
    this.point = start
    this.angle = angle
  }
}
