import { Padding } from './padding'
import { Point } from './point'
import { Size } from './size'

export class Viewport implements Padding {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly top: number
  readonly left: number
  readonly bottom: number
  readonly right: number

  constructor (size: Size, padding: Padding) {
    this.top = padding.top
    this.left = padding.left
    this.bottom = size.height - padding.bottom
    this.right = size.width - padding.right
    this.x = padding.left
    this.width = size.width - padding.right - this.x
    this.y = padding.top
    this.height = size.height - padding.bottom - this.y
  }

  hitTest (point: Point): boolean {
    return point.x >= this.x && point.x <= this.width + this.x &&
           point.y >= this.y && point.y <= this.height + this.y
  }
}
