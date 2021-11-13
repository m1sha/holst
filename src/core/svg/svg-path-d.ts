import { Point } from '../point'
import { parseSvgPathD, toSvgPathD } from './svg-path-d-parser'
import { point } from '../utils'
import { SvgPathDElement } from './svg-path-d-element'
import { toPath2D } from './path2d-converter'

export class SvgPathD {
  private items: SvgPathDElement[] = []
  private position: Point = point(0, 0)
  constructor (d?: string) {
    if (d) this.items = parseSvgPathD(d)
  }

  add (item: SvgPathDElement): void {
    this.items.push(item)
  }

  toSvgPath (): string {
    return toSvgPathD(this.items)
  }

  toPath2D (path2d?: Path2D, ratio?: Point, scale: number = 1, move: Point = { x: 0, y: 0 }): Path2D {
    return toPath2D(path2d, ratio, scale, move)
  }

  get currentPosition (): Readonly<Point> {
    return this.position
  }
}
