import { Padding } from './padding'
import { Point } from './point'
import { Size } from './size'

export interface IRect {
  x: number
  y: number
  width: number
  height: number
}
export class Rect implements IRect, Size {
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

  get points (): Point[] {
    return [
      new Point(this.x, this.y),
      new Point(this.absWidth, this.y),
      new Point(this.absWidth, this.absHeight),
      new Point(this.x, this.absHeight)
    ]
  }

  outline ({ top, left, bottom, right }: Padding): Rect {
    return new Rect(this.x + left, this.y + top, this.width - right, this.height - bottom)
  }

  toRhombus (): Point[] {
    const up = { x: this.absCenter.x, y: this.y }
    const right = { x: this.absWidth + 0, y: this.absCenter.y }
    const bottom = { x: this.absCenter.x, y: this.absHeight + 0 }
    const left = { x: this.x - 0, y: this.absCenter.y }
    return [new Point(up), new Point(right), new Point(bottom), new Point(left)]
  }
}
