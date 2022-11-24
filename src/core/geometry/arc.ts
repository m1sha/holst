import { Rect } from './rect'

export class Arc {
  x: number
  y: number
  radius: number

  constructor (x: number, y: number, radius: number) {
    this.x = x
    this.y = y
    this.radius = radius
  }

  get bounds () {
    const x = this.x - this.radius
    const y = this.y - this.radius
    const w = (this.x + this.radius) - x
    const h = (this.y + this.radius) - y
    return new Rect(x, y, w, h)
  }
}
