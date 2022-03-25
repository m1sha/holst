import { Matrix2D } from '../matrix'
import { Point } from '../point'
import { Path2DElement } from './types/path2d-element'
type HandlerDelegate = (arr: Point[], element: Path2DElement, transform: Matrix2D, stack: Path2DElement[], index: number) => void
const handlers: Record<string, HandlerDelegate> = {}

handlers.Arc = (arr, element, transform) => {
  if (element.type !== 'Arc') return
  const p = transform.applyMatrix(new Point(element))
  arr.push(p)
  arr.push(new Point(p.x, p.y + element.radius))
  arr.push(new Point(p.x, p.y + -element.radius))
  arr.push(new Point(p.y, p.y + element.radius))
  arr.push(new Point(p.x, p.y + -element.radius))
}

handlers.ArcTo = (arr, element, transform) => {
  if (element.type !== 'ArcTo') return
  const p1 = transform.applyMatrix(new Point(element.x1, element.y1))
  const p2 = transform.applyMatrix(new Point(element.x2, element.y2))
  arr.push(p1)
  arr.push(p2)
  arr.push(new Point(p1.x, p1.y + element.radius))
  arr.push(new Point(p1.x, p1.y + -element.radius))
  arr.push(new Point(p1.y, p1.y + element.radius))
  arr.push(new Point(p1.x, p1.y + -element.radius))
}

handlers.BezierCurveTo = (arr, element, transform) => {
  if (element.type !== 'BezierCurveTo') return
  const p = transform.applyMatrix(new Point(element))
  arr.push(p)
}

handlers.ClosePath = () => {}

handlers.Ellipse = (arr, element, transform) => {
  if (element.type !== 'Ellipse') return
  const p = transform.applyMatrix(new Point(element))
  arr.push(p)
  arr.push(new Point(p.x, element.radiusX))
  arr.push(new Point(p.x, -element.radiusX))
  arr.push(new Point(p.y, element.radiusY))
  arr.push(new Point(p.x, -element.radiusY))
}

handlers.LineTo = (arr, element, transform) => {
  if (element.type !== 'LineTo') return
  const p = transform.applyMatrix(new Point(element))
  arr.push(p)
}

handlers.MoveTo = (arr, element, transform) => {
  if (element.type !== 'MoveTo') return
  const p = transform.applyMatrix(new Point(element))
  arr.push(p)
}

handlers.QuadraticCurveTo = (arr, element, transform) => {
  if (element.type !== 'QuadraticCurveTo') return
  const p = transform.applyMatrix(new Point(element))
  arr.push(p)
  arr.push(new Point(p.x, element.cpx))
  arr.push(new Point(p.y, element.cpy))
}

handlers.Rect = (arr, element, transform) => {
  if (element.type !== 'Rect') return
  const p = transform.applyMatrix(new Point(element))
  arr.push(p)
  arr.push(new Point(p.x + element.w, p.y + element.h))
}

export function createPoints (stack: Path2DElement[], transform: Matrix2D): Point[] {
  const result: Point[] = []
  let i = 0
  for (const element of stack) handlers[element.type](result, element, transform, stack, i++)
  return result
}
