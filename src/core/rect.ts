import { Padding } from './padding'
import { IPoint, Point } from './point'
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

  outline (padding: number): Rect
  // eslint-disable-next-line no-dupe-class-members
  outline (top: number, left: number, bottom: number, right: number): Rect
  // eslint-disable-next-line no-dupe-class-members
  outline ({ top, left, bottom, right }: Padding): Rect
  // eslint-disable-next-line no-dupe-class-members
  outline (...args: Array<any>): Rect {
    if (args.length === 4 && !args.some(p => typeof p !== 'number')) {
      const [top, left, bottom, right] = args
      return new Rect(this.x + left, this.y + top, this.width - right - left, this.height - bottom - top)
    } else
    if (typeof args[0] === 'number') {
      const padding = args[0]
      return new Rect(this.x + padding, this.y + padding, this.width - padding - padding, this.height - padding - padding)
    } else {
      const { top, left, bottom, right } = args[0]
      return new Rect(this.x + left, this.y + top, this.width - right - left, this.height - bottom - top)
    }
  }

  toRhombus (): Point[] {
    const up = { x: this.absCenter.x, y: this.y }
    const right = { x: this.absWidth + 0, y: this.absCenter.y }
    const bottom = { x: this.absCenter.x, y: this.absHeight + 0 }
    const left = { x: this.x - 0, y: this.absCenter.y }
    return [new Point(up), new Point(right), new Point(bottom), new Point(left)]
  }

  intersectsPoint (point: IPoint): boolean {
    return (point.x > this.x && point.x < this.absWidth) && (point.y > this.y && point.y < this.absHeight)
  }

  intersectsRect (rect: Rect): boolean {
    return ((rect.x > this.x && rect.x < this.absWidth) && (rect.y > this.y && rect.y < this.absHeight)) ||
      ((this.x > rect.x && this.x < rect.absWidth) && (this.y > rect.y && this.y < rect.absHeight))
  }
}
