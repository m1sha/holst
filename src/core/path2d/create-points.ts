import { Matrix2D } from '../matrix'
import { Point } from '../point'
import { Path2DElement } from './types/path2d-element'

export function createPoints (stack: Path2DElement[], transform: Matrix2D): Point[] {
  const result: Point[] = []
  for (const i of stack) {
    switch (i.type) {
      case 'Arc': {
        const p = transform.applyMatrix(i)
        result.push(p)
        result.push(new Point(p.x, i.radius))
        result.push(new Point(p.x, -i.radius))
        result.push(new Point(p.y, i.radius))
        result.push(new Point(p.x, -i.radius))
        continue
      }
      case 'ArcTo': {
        const p1 = transform.applyMatrix(new Point(i.x1, i.y1))
        const p2 = transform.applyMatrix(new Point(i.x2, i.y2))
        result.push(p1)
        result.push(p2)
        result.push(new Point(p1.x, i.radius))
        result.push(new Point(p1.x, -i.radius))
        result.push(new Point(p1.y, i.radius))
        result.push(new Point(p1.x, -i.radius))
        continue
      }
      case 'BezierCurveTo': {
        const p = transform.applyMatrix(i)
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
        const p = transform.applyMatrix(i)
        result.push(p)
        result.push(new Point(p.x, i.radiusX))
        result.push(new Point(p.x, -i.radiusX))
        result.push(new Point(p.y, i.radiusY))
        result.push(new Point(p.x, -i.radiusY))
        continue
      }
      case 'LineTo': {
        const p = transform.applyMatrix(i)
        result.push(p)
        continue
      }
      case 'MoveTo': {
        const p = transform.applyMatrix(i)
        result.push(p)
        continue
      }
      case 'QuadraticCurveTo': {
        const p = transform.applyMatrix(i)
        result.push(p)
        result.push(new Point(p.x, i.cpx))
        result.push(new Point(p.y, i.cpy))
        continue
      }
      case 'Rect': {
        const p = transform.applyMatrix(i)
        result.push(p)
        result.push(new Point(p.x + i.w, p.y + i.h))
        continue
      }
    }
  }
  return result
}
