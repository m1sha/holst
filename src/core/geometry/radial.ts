import { Matrix2D } from '../matrix'
import { Rect } from './rect'

export class Radial {
  x: number
  y: number
  radiusX: number
  radiusY: number
  startAngle: number
  endAngle: number
  rotation: number

  constructor (x: number, y: number, radiusX: number, radiusY: number, rotation: number = 0, startAngle: number = 0, endAngle: number = Math.PI * 2) {
    this.x = x
    this.y = y
    this.radiusX = radiusX
    this.radiusY = radiusY
    this.rotation = rotation
    this.startAngle = startAngle
    this.endAngle = endAngle
  }

  get bounds () {
    const x = this.x - this.radiusX
    const y = this.y - this.radiusY
    const w = (this.x + this.radiusX) - x
    const h = (this.y + this.radiusY) - y
    if (this.startAngle !== 0 && this.endAngle !== Math.PI * 2) {
      Matrix2D.identity.rotate(this.startAngle / Math.PI * 180, this).applyMatrix({ x: x + this.radiusX, y })
      Matrix2D.identity.rotate(this.endAngle / Math.PI * 180, this).applyMatrix({ x: x + this.radiusY, y })
    }
    return new Rect(x, y, w, h)
  }
}
