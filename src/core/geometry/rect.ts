import { Padding } from './padding'
import { IPoint, Point } from './point'
import { Size } from './size'

export interface IRect {
  x: number
  y: number
  width: number
  height: number
}

export interface IRectReadonly{
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly absWidth: number
  readonly absHeight: number
  readonly center: Readonly<IPoint>
  readonly absCenter: Readonly<IPoint>
}

export class Rect implements IRect, Size {
  x: number = 0
  y: number = 0
  width: number = 0
  height: number = 0

  constructor (rect: IRect)
  constructor (p: IPoint, size: Size)
  constructor (x: number, y: number, width: number, height: number)
  constructor (...args: any[]) {
    if (args.length === 1) {
      this.x = args[0].x
      this.y = args[0].y
      this.width = args[0].width
      this.height = args[0].height
    }
    if (args.length === 2) {
      const [p, size] = args
      this.x = p.x
      this.y = p.y
      this.width = size.width
      this.height = size.height
    }
    if (args.length === 4) {
      const [x, y, width, height] = args
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    }
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

  get topLeft () {
    return new Point(this.x, this.y)
  }

  get topRight () {
    return new Point(this.absWidth, this.y)
  }

  get bottomLeft () {
    return new Point(this.x, this.absHeight)
  }

  get bottomRight () {
    return new Point(this.absWidth, this.absHeight)
  }

  get points (): Point[] {
    return [
      this.topLeft,
      this.topRight,
      this.bottomRight,
      this.bottomLeft
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
    return this.intersectsHorizontal(point.x) && this.intersectsVertical(point.y)
  }

  intersectsHorizontal (x: number) {
    return x >= this.x && x <= this.absWidth
  }

  intersectsVertical (y: number) {
    return y >= this.y && y <= this.absHeight
  }

  intersectsRect (rect: Rect): boolean {
    return ((rect.x >= this.x && rect.x <= this.absWidth) && (rect.y >= this.y && rect.y <= this.absHeight)) ||
      ((this.x >= rect.x && this.x <= rect.absWidth) && (this.y >= rect.y && this.y <= rect.absHeight))
  }

  clone () {
    return new Rect(this)
  }

  equals (rect: IRect): boolean {
    return this.x === rect.x && this.y === rect.y && this.width === rect.width && this.height === rect.height
  }

  join (rect: IRect): this {
    this.x = Math.min(this.x, rect.x)
    this.y = Math.min(this.x, rect.x)
    this.width = this.x + this.width > rect.x + rect.width ? this.width : rect.width
    this.height = this.y + this.height > rect.y + rect.height ? this.height : rect.height
    return this
  }

  static fromCenter (cp: IPoint, size: Size): Rect
  // eslint-disable-next-line no-dupe-class-members
  static fromCenter (cp: IPoint, width: number, height: number): Rect
  // eslint-disable-next-line no-dupe-class-members
  static fromCenter (...args: Array<any>): Rect {
    if (args.length === 2 && typeof args[0] === 'object' && typeof args[1] === 'object') {
      const [cp, size] = args
      return new Rect(cp.x - size.width / 2, cp.y - size.height / 2, size.width, size.height)
    }
    if (args.length === 3 && typeof args[0] === 'object' && typeof args[1] === 'number' && typeof args[2] === 'number') {
      const [cp, width, height] = args
      return new Rect(cp.x - width / 2, cp.y - height / 2, width, height)
    }
    throw new Error('mismatch parameters')
  }

  static fromTwoPoints (p1: IPoint, p2: IPoint) {
    const s = new Point(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y))
    const e = new Point(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y)).dec(s)
    return new Rect(s, { width: e.x, height: e.y })
  }

  static assign (dist: IRect, src: IRect): void {
    dist.x = src.x; dist.y = src.y
    dist.width = src.width; dist.height = src.height
  }
}
