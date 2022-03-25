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
const handlers: Record<string, (path: Path2D, element: Path2DElement, transform: Matrix2D, stack: Path2DElement[]) => void> = {}
handlers.Arc = (path, element, transform) => {
  if (element.type !== 'Arc') return
  const { radius, startAngle, endAngle, counterclockwise } = element
  const { x, y } = transform.applyMatrix(new Point(element))
  path.arc(x, y, radius, startAngle, endAngle, counterclockwise)
}

handlers.ArcTo = (path, element, transform) => {
  if (element.type !== 'ArcTo') return
  const { x1, x2, y1, y2, radius } = element
  const p1 = transform.applyMatrix(new Point(x1, y1))
  const p2 = transform.applyMatrix(new Point(x2, y2))
  path.arcTo(p1.x, p1.y, p2.x, p2.y, radius)
}

handlers.BezierCurveTo = (path, element, transform) => {
  if (element.type !== 'BezierCurveTo') return
  const { cp1x, cp1y, cp2x, cp2y } = element
  const { x, y } = transform.applyMatrix(new Point(element))
  path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
}

handlers.ClosePath = (path, element) => {
  if (element.type !== 'ClosePath') return
  path.closePath()
}

handlers.Ellipse = (path, element, transform) => {
  if (element.type !== 'Ellipse') return
  const { radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise } = element
  const { x, y } = transform.applyMatrix(new Point(element))
  path.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise)
}

handlers.LineTo = (path, element, transform) => {
  if (element.type !== 'LineTo') return
  const { x, y } = transform.applyMatrix(new Point(element))
  path.lineTo(x, y)
}

handlers.MoveTo = (path, element, transform) => {
  if (element.type !== 'MoveTo') return
  const { x, y } = transform.applyMatrix(new Point(element))
  path.moveTo(x, y)
}

handlers.QuadraticCurveTo = (path, element, transform) => {
  if (element.type !== 'QuadraticCurveTo') return
  const { cpx, cpy } = element
  const { x, y } = transform.applyMatrix(new Point(element))
  path.quadraticCurveTo(cpx, cpy, x, y)
}

handlers.Rect = (path, element, transform) => {
  if (element.type !== 'Rect') return
  const { w, h } = element
  const { x, y } = transform.applyMatrix(new Point(element))
  path.rect(x, y, w, h)
}

handlers.MoveToR = () => {}

handlers.LineToR = (path, element, transform, stack) => {
  if (element.type !== 'LineToR') return
  const moveTo = getLastElement<MoveToR>(stack, 'MoveToR')
  if (!moveTo) throw new Error('MoveToR is not found on the stack')
  const p0 = transform.applyMatrix(new Point(element))
  path.lineTo(p0.x, p0.y)

  const p = transform.applyMatrix(new Point(element.x + moveTo.x, element.y + moveTo.y))
  path.lineTo(p.x, p.y)
}

export function createPath2D (stack: Path2DElement[], transform: Matrix2D): Path2D {
  const path = new Path2D()
  for (const element of stack) handlers[element.type](path, element, transform, stack)
  return path
}
