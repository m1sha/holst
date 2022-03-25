import { Matrix2D } from '../matrix'
import { Point } from '../point'
import { MoveToR, Path2DElement } from './types/path2d-element'
const getLastElement = <T extends Path2DElement>(stack: Path2DElement[], type: string): T | null => {
  const l = stack.length
  for (let i = l; i >= 0; i--) {
    if (stack[i].type === type) return stack[i] as T
  }
  return null
}
export function createPath2D (stack: Path2DElement[], transform: Matrix2D): Path2D {
  const path = new Path2D()
  for (const i of stack) {
    switch (i.type) {
      case 'Arc': {
        const p = transform.applyMatrix(i)
        path.arc(p.x, p.y, i.radius, i.startAngle, i.endAngle, i.counterclockwise)
        continue
      }
      case 'ArcTo': {
        const p1 = transform.applyMatrix(new Point(i.x1, i.y1))
        const p2 = transform.applyMatrix(new Point(i.x2, i.y2))
        path.arcTo(p1.x, p1.y, p2.x, p2.y, i.radius)
        continue
      }
      case 'BezierCurveTo': {
        const p = transform.applyMatrix(i)
        path.bezierCurveTo(i.cp1x, i.cp1y, i.cp2x, i.cp2y, p.x, p.y)
        continue
      }
      case 'ClosePath':
        path.closePath()
        continue
      case 'Ellipse': {
        const p = transform.applyMatrix(i)
        path.ellipse(p.x, p.y, i.radiusX, i.radiusY, i.rotation, i.startAngle, i.endAngle, i.counterclockwise)
        continue
      }
      case 'LineTo': {
        const p = transform.applyMatrix(i)
        path.lineTo(p.x, p.y)
        continue
      }
      case 'MoveTo': {
        const p = transform.applyMatrix(i)
        path.moveTo(p.x, p.y)
        continue
      }
      case 'QuadraticCurveTo': {
        const p = transform.applyMatrix(i)
        path.quadraticCurveTo(i.cpx, i.cpy, p.x, p.y)
        continue
      }
      case 'Rect': {
        // TODO apply matrix to Path2D.Rect?
        const p = transform.applyMatrix(i)
        path.rect(p.x, p.y, i.w, i.h)
        continue
      }
      case 'MoveToR': {
        continue
      }
      case 'LineToR': {
        const moveTo = getLastElement<MoveToR>(stack, 'MoveToR')
        if (!moveTo) throw new Error('MoveToR is not found on the stack')
        const p0 = transform.applyMatrix(moveTo)
        path.lineTo(p0.x, p0.y)

        const p = transform.applyMatrix(new Point(i.x + moveTo.x, i.y + moveTo.y))
        path.lineTo(p.x, p.y)
        continue
      }
    }
  }
  return path
}
