import { Matrix2D } from './matrix'
import { Path2DBase } from './path2d-base'
import { Point } from './point'
interface Arc {
  type: 'Arc'
  x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean
}

interface ArcTo {
  type: 'ArcTo'
  x1: number, y1: number, x2: number, y2: number, radius: number
}

interface BezierCurveTo {
  type: 'BezierCurveTo'
  cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number
}

interface Ellipse {
  type: 'Ellipse'
  x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean
}

interface LineTo {
  type: 'LineTo',
  x: number, y: number
}

interface MoveTo {
  type: 'MoveTo',
  x: number, y: number
}

interface QuadraticCurveTo {
  type: 'QuadraticCurveTo',
  cpx: number, cpy: number, x: number, y: number
}

interface Rect {
  type: 'Rect',
  x: number, y: number, w: number, h: number
}

interface ClosePath {
  type: 'ClosePath'
}

interface ArcR {
  type: 'ArcR'
  radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean
}

interface EllipseR {
  type: 'EllipseR'
  radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean
}

interface MoveToR {
  type: 'MoveToR',
  x: number, y: number
}

interface LineToR {
  type: 'LineToR',
  x: number, y: number
}

interface LineHR {
  type: 'LineHR',
  w: number
}

interface LineVR {
  type: 'LineVR',
  h: number
}

interface RectR {
  type: 'RectR',
  w: number, h: number
}

type Path2DElement =
  | Arc
  | ArcTo
  | BezierCurveTo
  | Ellipse
  | LineTo
  | LineHR
  | LineVR
  | MoveTo
  | QuadraticCurveTo
  | Rect
  | ClosePath
  | MoveToR
  | ArcR
  | EllipseR
  | LineToR
  | RectR

const getLastElement = <T extends Path2DElement>(stack: Path2DElement[], type: string): T | null => {
  const l = stack.length
  for (let i = l; i >= 0; i--) {
    if (stack[i].type === type) return stack[i] as T
  }
  return null
}

export class MutablePath2D implements Path2DBase {
  addPath (path: Path2DBase, transform?: Matrix2D): void {
    if (!(path instanceof MutablePath2D)) throw new Error('Method unsupported.')
    if (transform) this.transform.mul(transform)
    for (const item of path.stack) this.stack.push(item)
  }

  arc (x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void {
    this.stack.push({ type: 'Arc', x, y, radius, startAngle, endAngle, counterclockwise })
  }

  arcTo (x1: number, y1: number, x2: number, y2: number, radius: number): void {
    this.stack.push({ type: 'ArcTo', x1, y1, x2, y2, radius })
  }

  bezierCurveTo (cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
    this.stack.push({ type: 'BezierCurveTo', cp1x, cp1y, cp2x, cp2y, x, y })
  }

  ellipse (x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void {
    this.stack.push({ type: 'Ellipse', x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise })
  }

  lineTo (x: number, y: number): void {
    this.stack.push({ type: 'LineTo', x, y })
  }

  moveTo (x: number, y: number): void {
    this.stack.push({ type: 'MoveTo', x, y })
  }

  quadraticCurveTo (cpx: number, cpy: number, x: number, y: number): void {
    this.stack.push({ type: 'QuadraticCurveTo', cpx, cpy, x, y })
  }

  rect (x: number, y: number, w: number, h: number): void {
    this.stack.push({ type: 'Rect', x, y, w, h })
  }

  closePath (): void {
    this.stack.push({ type: 'ClosePath' })
  }

  moveToR (x: number, y: number): void {
    this.stack.push({ type: 'MoveToR', x, y })
  }

  arcR (radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void {
    this.stack.push({ type: 'ArcR', radius, startAngle, endAngle, counterclockwise })
  }

  ellipseR (radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void {
    this.stack.push({ type: 'EllipseR', radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise })
  }

  lineToR (x: number, y: number): void {
    this.stack.push({ type: 'LineToR', x, y })
  }

  lineHR (w: number): void {
    this.stack.push({ type: 'LineHR', w })
  }

  lineVR (h: number): void {
    this.stack.push({ type: 'LineVR', h })
  }

  rectR (w: number, h: number): void {
    this.stack.push({ type: 'RectR', w, h })
  }

  private stack: Path2DElement[] = []
  transform = Matrix2D.identity

  createPath2D (): Path2D {
    const path = new Path2D()
    for (const i of this.stack) {
      switch (i.type) {
        case 'Arc': {
          const p = this.transform.applyMatrix(i)
          path.arc(p.x, p.y, i.radius, i.startAngle, i.endAngle, i.counterclockwise)
          continue
        }
        case 'ArcTo': {
          const p1 = this.transform.applyMatrix(new Point(i.x1, i.y1))
          const p2 = this.transform.applyMatrix(new Point(i.x2, i.y2))
          path.arcTo(p1.x, p1.y, p2.x, p2.y, i.radius)
          continue
        }
        case 'BezierCurveTo': {
          const p = this.transform.applyMatrix(i)
          path.bezierCurveTo(i.cp1x, i.cp1y, i.cp2x, i.cp2y, p.x, p.y)
          continue
        }
        case 'ClosePath':
          path.closePath()
          continue
        case 'Ellipse': {
          const p = this.transform.applyMatrix(i)
          path.ellipse(p.x, p.y, i.radiusX, i.radiusY, i.rotation, i.startAngle, i.endAngle, i.counterclockwise)
          continue
        }
        case 'LineTo': {
          const p = this.transform.applyMatrix(i)
          path.lineTo(p.x, p.y)
          continue
        }
        case 'MoveTo': {
          const p = this.transform.applyMatrix(i)
          path.moveTo(p.x, p.y)
          continue
        }
        case 'QuadraticCurveTo': {
          const p = this.transform.applyMatrix(i)
          path.quadraticCurveTo(i.cpx, i.cpy, p.x, p.y)
          continue
        }
        case 'Rect': {
          // TODO apply matrix to Path2D.Rect?
          const p = this.transform.applyMatrix(i)
          path.rect(p.x, p.y, i.w, i.h)
          continue
        }
        case 'MoveToR': {
          continue
        }
        case 'LineToR': {
          const moveTo = getLastElement<MoveToR>(this.stack, 'MoveToR')
          if (!moveTo) throw new Error('MoveToR is not found on the stack')
          const p0 = this.transform.applyMatrix(moveTo)
          path.lineTo(p0.x, p0.y)

          const p = this.transform.applyMatrix(new Point(i.x + moveTo.x, i.y + moveTo.y))
          path.lineTo(p.x, p.y)
          continue
        }
      }
    }
    return path
  }

  toPoints (): Point[] {
    const result: Point[] = []
    for (const i of this.stack) {
      switch (i.type) {
        case 'Arc': {
          const p = this.transform.applyMatrix(i)
          result.push(p)
          result.push(new Point(p.x, i.radius))
          result.push(new Point(p.x, -i.radius))
          result.push(new Point(p.y, i.radius))
          result.push(new Point(p.x, -i.radius))
          continue
        }
        case 'ArcTo': {
          const p1 = this.transform.applyMatrix(new Point(i.x1, i.y1))
          const p2 = this.transform.applyMatrix(new Point(i.x2, i.y2))
          result.push(p1)
          result.push(p2)
          result.push(new Point(p1.x, i.radius))
          result.push(new Point(p1.x, -i.radius))
          result.push(new Point(p1.y, i.radius))
          result.push(new Point(p1.x, -i.radius))
          continue
        }
        case 'BezierCurveTo': {
          const p = this.transform.applyMatrix(i)
          result.push(p)
          // result.push(p.x + i.cp1x)
          // result.push(p.x + i.cp2x)
          // result.push(p.y + i.cp1y)
          // result.push(p.y + i.cp2y)
          continue
        }
        case 'ClosePath':
          continue
        case 'Ellipse': {
          const p = this.transform.applyMatrix(i)
          result.push(p)
          result.push(new Point(p.x, i.radiusX))
          result.push(new Point(p.x, -i.radiusX))
          result.push(new Point(p.y, i.radiusY))
          result.push(new Point(p.x, -i.radiusY))
          continue
        }
        case 'LineTo': {
          const p = this.transform.applyMatrix(i)
          result.push(p)
          continue
        }
        case 'MoveTo': {
          const p = this.transform.applyMatrix(i)
          result.push(p)
          continue
        }
        case 'QuadraticCurveTo': {
          const p = this.transform.applyMatrix(i)
          result.push(p)
          result.push(new Point(p.x, i.cpx))
          result.push(new Point(p.y, i.cpy))
          continue
        }
        case 'Rect': {
          const p = this.transform.applyMatrix(i)
          result.push(p)
          result.push(new Point(p.x + i.w, p.y + i.h))
          continue
        }
      }
    }
    return result
  }

  copy () {
    const result = new MutablePath2D()
    for (const i of this.stack) {
      result.stack.push(i)
    }
    result.transform = this.transform.copy()
    return result
  }
}
