import { Padding } from './padding'
import { Point } from './point'
import { Rect } from './rect'

export class Viewport implements Rect, Padding {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly top: number
  readonly left: number
  readonly bottom: number
  readonly right: number

  constructor (bounds: Rect, padding: Padding) {
    this.top = padding.top
    this.left = padding.left
    this.bottom = bounds.height - padding.bottom
    this.right = bounds.width - padding.right
    this.x = bounds.x + padding.left
    this.width = bounds.width - padding.right - this.x
    this.y = bounds.y + padding.top
    this.height = bounds.height - padding.bottom - this.y
  }

  hitTest (point: Point): boolean {
    return point.x >= this.x && point.x <= this.width + this.x &&
           point.y >= this.y && point.y <= this.height + this.y
  }
}
