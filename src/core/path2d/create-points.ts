import { Matrix2D } from '../matrix'
import { Point, IPoint } from '../point'
import { Path2DElement } from './path2d-element'
type HandlerInputType = {
  element: Path2DElement,
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

handlers.Arc = (arr, { element, transform }) => {
  if (element.type !== 'Arc') return
  const p = transform.applyMatrix(new Point(element))
  arr.push(p)
  arr.push(new Point(p.x, p.y + element.radius))
  arr.push(new Point(p.x, p.y + -element.radius))
  arr.push(new Point(p.y, p.y + element.radius))
  arr.push(new Point(p.x, p.y + -element.radius))
}

handlers.ArcTo = (arr, { element, transform }) => {
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

handlers.BezierCurveTo = (arr, { element, transform }) => {
  if (element.type !== 'BezierCurveTo') return
  const p = transform.applyMatrix(new Point(element))
  arr.push(p)
}

handlers.ClosePath = () => {}

handlers.Ellipse = (arr, { element, transform, globalTransform }) => {
  if (element.type !== 'Ellipse') return
  const { x, y, radiusX, radiusY } = element
  const p1 = calcPoint({ x: x - radiusX, y: y - radiusY }, transform, globalTransform)
  const p2 = calcPoint({ x: x + radiusX, y: y - radiusY }, transform, globalTransform)
  const p3 = calcPoint({ x: x + radiusX, y: y + radiusY }, transform, globalTransform)
  const p4 = calcPoint({ x: x - radiusX, y: y + radiusY }, transform, globalTransform)
  arr.push(p1, p2, p3, p4)
}

handlers.LineTo = (arr, { element, transform, globalTransform }) => {
  if (element.type !== 'LineTo') return
  const { x, y } = element
  const p = calcPoint({ x, y }, transform, globalTransform)
  arr.push(p)
}

handlers.MoveTo = (arr, { element, transform, globalTransform }) => {
  if (element.type !== 'MoveTo') return
  const { x, y } = element
  const p = calcPoint({ x, y }, transform, globalTransform)
  arr.push(p)
}

handlers.QuadraticCurveTo = (arr, { element, transform }) => {
  if (element.type !== 'QuadraticCurveTo') return
  const p = transform.applyMatrix(new Point(element))
  arr.push(p)
  arr.push(new Point(p.x, element.cpx))
  arr.push(new Point(p.y, element.cpy))
}

handlers.Rect = (arr, { element, transform, globalTransform }) => {
  if (element.type !== 'Rect') return
  const { x, y, width: w, height: h } = element
  const p1 = calcPoint({ x, y }, transform, globalTransform)
  const p2 = calcPoint({ x: x + w, y }, transform, globalTransform)
  const p3 = calcPoint({ x: x + w, y: y + h }, transform, globalTransform)
  const p4 = calcPoint({ x, y: y + h }, transform, globalTransform)
  arr.push(p1, p2, p3, p4)
}

handlers.RoundRect = (arr, { element, transform, globalTransform }) => {
  if (element.type !== 'RoundRect') return
  const { x, y, width: w, height: h } = element
  const p1 = calcPoint({ x, y }, transform, globalTransform)
  const p2 = calcPoint({ x: x + w, y }, transform, globalTransform)
  const p3 = calcPoint({ x: x + w, y: y + h }, transform, globalTransform)
  const p4 = calcPoint({ x, y: y + h }, transform, globalTransform)
  arr.push(p1, p2, p3, p4)
}

handlers.Circle = (arr, { element, transform, globalTransform }) => {
  if (element.type !== 'Circle') return
  const { x, y, radius } = element
  const p1 = calcPoint({ x: x - radius, y: y - radius }, transform, globalTransform)
  const p2 = calcPoint({ x: x + radius, y: y - radius }, transform, globalTransform)
  const p3 = calcPoint({ x: x + radius, y: y + radius }, transform, globalTransform)
  const p4 = calcPoint({ x: x - radius, y: y + radius }, transform, globalTransform)
  arr.push(p1, p2, p3, p4)
}

export function createPoints (stack: Path2DElement[], transform: Matrix2D, globalTransform?: Matrix2D): IPoint[] {
  const result: IPoint[] = []
  let i = 0
  for (const element of stack) handlers[element.type](result, { element, transform, stack, index: i++, globalTransform })
  return result
}
