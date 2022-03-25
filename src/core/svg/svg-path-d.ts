import { Point } from '../point'
import { parseSvgPathD, toSvgPathD } from './svg-path-d-parser'
import { SvgPathDElement } from './svg-path-d-element'
import { toPath2D } from './path2d-converter'
import { MutablePath2D } from '../path2d/mutable-path2d'

export class SvgPathD {
  private items: SvgPathDElement[] = []
  private position = new Point(0, 0)
  constructor (d?: string) {
    if (d) this.items = parseSvgPathD(d)
  }

  add (item: SvgPathDElement): void {
    this.items.push(item)
  }

  toSvgPath (): string {
    return toSvgPathD(this.items)
  }

  toPath2D (path2d?: MutablePath2D, ratio?: Point, scale: number = 1, move: Point = { x: 0, y: 0 }): MutablePath2D {
    const { path, position } = toPath2D(this.items, this.position, path2d, ratio, scale, move)
    this.position = position
    return path
  }

  calcEndPosition (): Readonly<Point> {
    const { position } = toPath2D(this.items, this.position)
    return position
  }

  get currentPosition (): Readonly<Point> {
    return this.position
  }
}
