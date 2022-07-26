import { Matrix2D } from '../matrix'
import { Point, IPoint } from '../geometry/point'
import { Path2DElement } from './path2d-element'
type HandlerInputType = {
  element: Path2DElement,
  d: IPoint,
  transform: Matrix2D,
  stack: Path2DElement[],
  index: number,
  globalTransform?: Matrix2D
}
type HandlerDelegate = (arr: IPoint[], input: HandlerInputType) => void
const handlers: Record<string, HandlerDelegate> = {}

const calcPoint = (p: IPoint, transform: Matrix2D, globalTransform?: Matrix2D): IPoint => {
  const t2 = globalTransform ?? Matrix2D.identity
  return t2.applyMatrix(transform.applyMatrix(p))
}

handlers.Arc = (arr, { element, d, transform }) => {
  if (element.type !== 'Arc') return
  const p = transform.applyMatrix(new Point(element).add(d))
  arr.push(new Point(p.x - element.radius, p.y - element.radius))
  arr.push(new Point(p.x + element.radius, p.y - element.radius))
  arr.push(new Point(p.x + element.radius, p.y + element.radius))
  arr.push(new Point(p.x - element.radius, p.y + element.radius))
}

handlers.ArcTo = (arr, { element, d, transform }) => {
  if (element.type !== 'ArcTo') return
  const p1 = transform.applyMatrix(new Point(element.x1 + d.x, element.y1 + d.y))
  const p2 = transform.applyMatrix(new Point(element.x2 + d.x, element.y2 + d.y))
  arr.push(new Point(p1.x - element.radius, p1.y - element.radius))
  arr.push(new Point(p1.x + element.radius, p1.y - element.radius))
  arr.push(new Point(p2.x + element.radius, p2.y + element.radius))
  arr.push(new Point(p2.x - element.radius, p2.y + element.radius))
}

handlers.BezierCurveTo = (arr, { element, transform }) => {
  if (element.type !== 'BezierCurveTo') return
  const p = transform.applyMatrix(new Point(element))
  arr.push(p)
}

handlers.ClosePath = () => {}

handlers.Ellipse = (arr, { element, d, transform, globalTransform }) => {
  if (element.type !== 'Ellipse') return
  const { radiusX, radiusY } = element
  const x = element.x + d.x
  const y = element.y + d.y
  const p1 = calcPoint({ x: x - radiusX, y: y - radiusY }, transform, globalTransform)
  const p2 = calcPoint({ x: x + radiusX, y: y - radiusY }, transform, globalTransform)
  const p3 = calcPoint({ x: x + radiusX, y: y + radiusY }, transform, globalTransform)
  const p4 = calcPoint({ x: x - radiusX, y: y + radiusY }, transform, globalTransform)
  arr.push(p1, p2, p3, p4)
}

handlers.LineTo = (arr, { element, d, transform, globalTransform }) => {
  if (element.type !== 'LineTo') return
  const x = element.x + d.x
  const y = element.y + d.y
  const p = calcPoint({ x, y }, transform, globalTransform)
  arr.push(p)
}

handlers.MoveTo = (arr, { element, d, transform, globalTransform }) => {
  if (element.type !== 'MoveTo') return
  const x = element.x + d.x
  const y = element.y + d.y
  const p = calcPoint({ x, y }, transform, globalTransform)
  arr.push(p)
}

handlers.QuadraticCurveTo = (arr, { element, d, transform }) => {
  if (element.type !== 'QuadraticCurveTo') return
  const p = transform.applyMatrix(new Point(element).add(d))
  arr.push(p)
  arr.push(new Point(p.x, element.cpx))
  arr.push(new Point(p.y, element.cpy))
}

handlers.Rect = (arr, { element, d, transform, globalTransform }) => {
  if (element.type !== 'Rect') return
  const { width: w, height: h } = element
  const x = element.x + d.x
  const y = element.y + d.y
  const p1 = calcPoint({ x, y }, transform, globalTransform)
  const p2 = calcPoint({ x: x + w, y }, transform, globalTransform)
  const p3 = calcPoint({ x: x + w, y: y + h }, transform, globalTransform)
  const p4 = calcPoint({ x, y: y + h }, transform, globalTransform)
  arr.push(p1, p2, p3, p4)
}

handlers.RoundRect = (arr, { element, d, transform, globalTransform }) => {
  if (element.type !== 'RoundRect') return
  const { width: w, height: h } = element
  const x = element.x + d.x
  const y = element.y + d.y
  const p1 = calcPoint({ x, y }, transform, globalTransform)
  const p2 = calcPoint({ x: x + w, y }, transform, globalTransform)
  const p3 = calcPoint({ x: x + w, y: y + h }, transform, globalTransform)
  const p4 = calcPoint({ x, y: y + h }, transform, globalTransform)
  arr.push(p1, p2, p3, p4)
}

handlers.Circle = (arr, { element, d, transform, globalTransform }) => {
  if (element.type !== 'Circle') return
  const { radius } = element
  const x = element.x + d.x
  const y = element.y + d.y
  const p1 = calcPoint({ x: x - radius, y: y - radius }, transform, globalTransform)
  const p2 = calcPoint({ x: x + radius, y: y - radius }, transform, globalTransform)
  const p3 = calcPoint({ x: x + radius, y: y + radius }, transform, globalTransform)
  const p4 = calcPoint({ x: x - radius, y: y + radius }, transform, globalTransform)
  arr.push(p1, p2, p3, p4)
}

handlers.SegmentedCircle = (arr, { element, d, transform, globalTransform }) => {
  if (element.type !== 'SegmentedCircle') return
  const { radius } = element
  const x = element.x + d.x
  const y = element.y + d.y
  const p1 = calcPoint({ x: x - radius, y: y - radius }, transform, globalTransform)
  const p2 = calcPoint({ x: x + radius, y: y - radius }, transform, globalTransform)
  const p3 = calcPoint({ x: x + radius, y: y + radius }, transform, globalTransform)
  const p4 = calcPoint({ x: x - radius, y: y + radius }, transform, globalTransform)
  arr.push(p1, p2, p3, p4)
}

export function createPoints (stack: Path2DElement[], d: IPoint, transform: Matrix2D, globalTransform?: Matrix2D): IPoint[] {
  const result: IPoint[] = []
  let i = 0
  for (const element of stack) handlers[element.type](result, { element, d, transform, stack, index: i++, globalTransform })
  return result
}
