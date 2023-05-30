import { Matrix2D } from '../matrix'
import { Point, IPoint } from '../geometry/point'
import { Path2DElement } from './path2d-element'
import { getPointsOnCubicCurve, getPointsOnQuadraticCurve } from '../geometry/bezier'
import { Radial } from '../geometry/radial'
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

const isFullCircle = (startAngle: number, endAngle: number): boolean => (
  startAngle >= 0 &&
  startAngle <= 0.001 &&
  endAngle >= Math.PI * 2 - 0.001 &&
  endAngle <= Math.PI * 2
)

handlers.Arc = (arr, { element, d, transform }) => {
  if (element.type !== 'Arc') return
  const p = transform.applyMatrix(new Point(element).add(d))
  const topLeft = new Point(p.x - element.radius, p.y - element.radius)
  const topRight = new Point(p.x + element.radius, p.y - element.radius)
  const bottomRight = new Point(p.x + element.radius, p.y + element.radius)
  const bottomLeft = new Point(p.x - element.radius, p.y + element.radius)

  if (isFullCircle(element.startAngle, element.endAngle)) {
    arr.push(topLeft, topRight, bottomRight, bottomLeft)
    return
  }

  const ps = Radial.getPoint(element.startAngle, p.x, p.y, element.radius)
  const pe = Radial.getPoint(element.endAngle, p.x, p.y, element.radius)

  arr.push(ps)
  arr.push(pe)

  if (element.endAngle >= Math.PI / 2) {
    arr.push(bottomLeft)
  }
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

handlers.BezierCurveTo = (arr, { element, transform, stack, index }) => {
  if (element.type !== 'BezierCurveTo') return
  const p0 = stack[index - 1] as IPoint
  if (!p0) return
  const p = transform.applyMatrix(new Point(element))
  const points = getPointsOnCubicCurve(new Point(p0), new Point(element.cp1x, element.cp1y), new Point(element.cp2x, element.cp2y), p, 10)
  arr.push(p0)
  arr.push(p)
  arr.push(...points)
}

handlers.ClosePath = () => {}

handlers.Ellipse = (arr, { element, d, transform, globalTransform }) => {
  if (element.type !== 'Ellipse') return
  const { radiusX, radiusY } = element
  const x = element.x + d.x
  const y = element.y + d.y

  if (isFullCircle(element.startAngle, element.endAngle)) {
    arr.push(
      calcPoint({ x: x - radiusX, y: y - radiusY }, transform, globalTransform),
      calcPoint({ x: x + radiusX, y: y - radiusY }, transform, globalTransform),
      calcPoint({ x: x + radiusX, y: y + radiusY }, transform, globalTransform),
      calcPoint({ x: x - radiusX, y: y + radiusY }, transform, globalTransform)
    )
    return
  }

  const l = calcPoint({ x: x - radiusX, y }, transform, globalTransform)
  const r = calcPoint({ x: x + radiusX, y }, transform, globalTransform)
  const b = calcPoint({ x, y: y + radiusY }, transform, globalTransform)
  const t = calcPoint({ x, y: y - radiusY }, transform, globalTransform)
  const ps = Radial.getPoint(element.startAngle, x, y, element.radiusX, element.radiusY)
  const pe = Radial.getPoint(element.endAngle, x, y, element.radiusX, element.radiusY)

  arr.push(ps)
  arr.push(pe)

  if (element.endAngle >= Math.PI * 2 / 3 || element.startAngle <= Math.PI / 2) {
    arr.push(r)
    arr.push(t)
    arr.push(b)
  }
  if (element.endAngle >= Math.PI) {
    arr.push(l)
  }
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

handlers.QuadraticCurveTo = (arr, { element, d, transform, stack, index }) => {
  if (element.type !== 'QuadraticCurveTo') return
  const p0 = stack[index - 1] as IPoint
  if (!p0) return
  const p = transform.applyMatrix(new Point(element).add(d))
  arr.push(p)
  const points = getPointsOnQuadraticCurve(new Point(p0), new Point(element.cpx, element.cpy), p, 10)
  arr.push(...points)
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
