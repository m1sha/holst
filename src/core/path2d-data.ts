import { POINT, Point } from './point'
import { point } from './utils'

interface MoveTo {
  type: 'M' | 'm'
  point: Point
}

interface HorizontalLine {
  type: 'H' | 'h'
  width: number
}

interface VerticalLine {
  type: 'V' | 'v'
  height: number
}

interface LineTo {
  type: 'L' | 'l'
  point: Point
}

interface CubicBezierCurve {
  type: 'C' | 'c'
  point1: Point
  point2: Point
  point: Point
}

interface SmoothCubicBezierCurve {
  type: 'S' | 's'
  point2: Point
  point: Point
}

interface QuadraticBezierCurve {
  type: 'Q' | 'q'
  point1: Point
  point: Point
}

interface SmoothQuadraticBezierCurve {
  type: 'T' | 't'
  point: Point
}

interface Arc {
  type: 'A' | 'a'
  target: Point
  angle: number
  largeArcFlag: 0 | 1
  sweepFlag: 0 | 1
  point: Point
}

interface ClosePath {
  type: 'Z' | 'z'
}

type Path2dItem = MoveTo | LineTo | HorizontalLine | VerticalLine | CubicBezierCurve | SmoothCubicBezierCurve
    | QuadraticBezierCurve | SmoothQuadraticBezierCurve | Arc | ClosePath

export class Path2dData {
  private items: Path2dItem[] = []
  private position: Point = point(0, 0)
  add (item: Path2dItem): void {
    this.items.push(item)
  }

  static parse (d: string): Path2dData {
    if (!d) throw new Error('The d parameter must not be empty')
    const parseParams = (i: number, d: string) => {
      let res = ''
      while (true) {
        const chr = d.charAt(i)
        if (!/[0-9-., ]/.test(chr)) break
        res += chr
        i++
        if (i >= d.length) break
      }
      return {
        i,
        params: res.split(' ').filter(p => p.length > 0)
      }
    }
    let i = 0
    const pathData = new Path2dData()
    while (i < d.length) {
      const chr = d.charAt(i)
      switch (chr) {
        case 'M':
        case 'm': {
          const res = parseParams(i + 1, d)
          i = res.i
          const x = parseFloat(res.params[0])
          const y = parseFloat(res.params[1])
          pathData.add({ type: chr, point: point(x, y) })
          continue
        }
        case 'H':
        case 'h': {
          const res = parseParams(i + 1, d)
          i = res.i
          const width = parseFloat(res.params[0])
          pathData.add({ type: chr, width })
          continue
        }
        case 'V':
        case 'v': {
          const res = parseParams(i + 1, d)
          i = res.i
          const height = parseFloat(res.params[0])
          pathData.add({ type: chr, height })
          continue
        }
        case ' ':
          i++
          continue
      }

      throw new Error(`Invalid char ${chr} at ${i} position`)
    }

    return pathData
  }

  toSvgPath (): string {
    let result = ''
    for (const item of this.items) {
      switch (item.type) {
        case 'M':
        case 'm':
          result += `${item.type}${item.point.x} ${item.point.y}`
          continue
        case 'H':
        case 'h':
          result += item.type + item.width
          continue
        case 'V':
        case 'v':
          result += item.type + item.height
          continue
      }
    }
    return result
  }

  toPath2D (path2d?: Path2D, ratio?: Point, scale: number = 1, move: Point = { x: 0, y: 0 }): Path2D {
    const path = path2d || new Path2D()
    const dx = ratio ? ratio.x : 1
    const dy = ratio ? ratio.y : 1
    this.position = point(move.x, move.y)
    for (const item of this.items) {
      switch (item.type) {
        case 'M':
          this.position = POINT.sum(POINT.mul(POINT.mul(item.point, point(dx, dy)), point(scale, scale)), move)
          continue
        case 'm':
          this.position = POINT.mul(POINT.mul(POINT.sum(this.position, item.point), point(dx, dy)), point(scale, scale))
          continue
        case 'V':
          this.position.y = item.height * dy
          path.lineTo(this.position.x, this.position.y)
          continue
        case 'v': {
          path.moveTo(this.position.x, this.position.y)
          this.position.y += item.height * dy * scale
          path.lineTo(this.position.x, this.position.y)
          continue
        }
        case 'H':
          this.position.x = item.width * dx
          path.lineTo(this.position.x, this.position.y)
          continue
        case 'h': {
          path.moveTo(this.position.x, this.position.y)
          this.position.x += item.width * dx * scale
          path.lineTo(this.position.x, this.position.y)
          continue
        }
        case 'L':
          this.position = POINT.sum(this.position, item.point)
          path.lineTo(this.position.x, this.position.y)
          continue
        case 'l':
          this.position = POINT.sum(this.position, item.point)
          path.lineTo(item.point.x, item.point.y)
          continue
        case 'Z':
        case 'z':
          path.closePath()
          continue
      }
    }
    return path
  }

  get currentPosition (): Readonly<Point> {
    return this.position
  }
}
