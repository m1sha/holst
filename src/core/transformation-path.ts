import { MATRIX, Matrix2D } from './matrix'
import { Path2DBase } from './path2d-base'
import { point } from './utils'
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

type Path2DElement = Arc | ArcTo | BezierCurveTo | Ellipse | LineTo | MoveTo | QuadraticCurveTo | Rect | ClosePath

export class TransformationPath implements Path2DBase {
  addPath (path: Path2DBase, transform?: Matrix2D): void {
    if (!(path instanceof TransformationPath)) throw new Error('Method unsupported.')
    if (transform) this.transform = MATRIX.mul(this.transform, transform)
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

  stack: Path2DElement[] = []
  transform: Matrix2D = MATRIX.identity

  createPath2D (): Path2D {
    const path = new Path2D()
    for (const i of this.stack) {
      switch (i.type) {
        case 'Arc': {
          const p = MATRIX.applyMatrix(this.transform, i)
          path.arc(p.x, p.y, i.radius, i.startAngle, i.endAngle, i.counterclockwise)
          break
        }
        case 'ArcTo': {
          const p1 = MATRIX.applyMatrix(this.transform, point(i.x1, i.y1))
          const p2 = MATRIX.applyMatrix(this.transform, point(i.x2, i.y2))
          path.arcTo(p1.x, p1.y, p2.x, p2.y, i.radius)
          break
        }
        case 'BezierCurveTo': {
          const p = MATRIX.applyMatrix(this.transform, i)
          path.bezierCurveTo(i.cp1x, i.cp1y, i.cp2x, i.cp2y, p.x, p.y)
          break
        }
        case 'ClosePath':
          path.closePath()
          break
        case 'Ellipse': {
          const p = MATRIX.applyMatrix(this.transform, i)
          path.ellipse(p.x, p.y, i.radiusX, i.radiusY, i.rotation, i.startAngle, i.endAngle, i.counterclockwise)
          break
        }
        case 'LineTo': {
          const p = MATRIX.applyMatrix(this.transform, i)
          path.lineTo(p.x, p.y)
          break
        }
        case 'MoveTo': {
          const p = MATRIX.applyMatrix(this.transform, i)
          path.moveTo(p.x, p.y)
          break
        }
        case 'QuadraticCurveTo': {
          const p = MATRIX.applyMatrix(this.transform, i)
          path.quadraticCurveTo(i.cpx, i.cpy, p.x, p.y)
          break
        }
        case 'Rect': {
          // TODO apply matrix to Path2D.Rect?
          const p = MATRIX.applyMatrix(this.transform, i)
          path.rect(p.x, p.y, i.w, i.h)
          break
        }
      }
    }
    return path
  }
}
