import { Matrix2D } from '../matrix'
import { Rect } from './rect'

export class Arc {
  x: number
  y: number
  radius: number
  startAngle: number
  endAngle: number

  constructor (x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    this.x = x
    this.y = y
    this.radius = radius
    this.startAngle = startAngle
    this.endAngle = endAngle
  }

  get bounds () {
    const x = this.x - this.radius
    const y = this.y - this.radius
    const w = (this.x + this.radius) - x
    const h = (this.y + this.radius) - y
    if (this.startAngle !== 0 && this.endAngle !== Math.PI * 2) {
      Matrix2D.identity.rotate(this.startAngle / Math.PI * 180, this).applyMatrix({ x: x + this.radius, y })
      Matrix2D.identity.rotate(this.endAngle / Math.PI * 180, this).applyMatrix({ x: x + this.radius, y })
    }
    return new Rect(x, y, w, h)
  }
}
