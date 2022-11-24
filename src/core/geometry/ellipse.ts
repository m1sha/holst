import { Rect } from './rect'

export class Ellipse {
  x: number
  y: number
  radiusX: number
  radiusY: number

  constructor (x: number, y: number, radiusX: number, radiusY: number) {
    this.x = x
    this.y = y
    this.radiusX = radiusX
    this.radiusY = radiusY
  }

  get bounds () {
    const x = this.x - this.radiusX
    const y = this.y - this.radiusY
    const w = (this.x + this.radiusX) - x
    const h = (this.y + this.radiusY) - y
    return new Rect(x, y, w, h)
  }
}
