import { Point } from './point'
import { Size } from './size'

export class Rect implements Size {
  x: number
  y: number
  width: number
  height: number

  constructor (x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  get center () {
    return new Point(this.width / 2, this.height / 2)
  }

  get absCenter () {
    const { x, y } = this.center
    return new Point(this.x + x, this.y + y)
  }

  get absWidth () {
    return this.x + this.width
  }

  get absHeight () {
    return this.y + this.height
  }
}
