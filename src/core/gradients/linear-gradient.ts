import { Gradient } from './gradient'
import { IPoint } from '../geometry/point'
import { ColorStop } from './color-stop'

export class LinearGradient extends Gradient {
  start: IPoint
  end: IPoint

  constructor (start: IPoint, end: IPoint, stops?: ColorStop[]) {
    super(stops)
    this.start = start
    this.end = end
  }
}
