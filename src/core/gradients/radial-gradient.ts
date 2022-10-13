import { Gradient } from './gradient'
import { ColorStop } from './color-stop'
import { IPoint } from '../point'

export class RadialGradient extends Gradient {
  start: IPoint
  end: IPoint
  startRadius: number
  endRadius: number

  constructor (start: IPoint, startRadius: number, end: IPoint, endRadius: number, stops?: ColorStop[]) {
    super(stops)
    this.start = start
    this.end = end
    this.startRadius = startRadius
    this.endRadius = endRadius
  }
}
