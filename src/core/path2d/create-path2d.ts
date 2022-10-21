import { arrow } from '../geometry/transform'
import { Matrix2D } from '../matrix'
import { IPoint, Point } from '../geometry/point'
import { Path2DElement } from './path2d-element'
import { drawSegmentedCircle } from '../geometry/segmented-circle'

type HandlerInputType = {
  path: Path2D,
  element: Path2DElement,
  d: IPoint
  transform: Matrix2D,
  stack: Path2DElement[],
  globalTransform?: Matrix2D
}

const calcPoint = (p: IPoint, d: IPoint, transform: Matrix2D, globalTransform?: Matrix2D): IPoint => {
  const t2 = globalTransform ?? Matrix2D.identity
  const r = new Point(p).add(d)
  return t2.applyMatrix(transform.applyMatrix(r))
}

const handlers: Record<string, (input: HandlerInputType) => void> = {}

const packager = (path: Path2D, d: IPoint, transform: Matrix2D, stack: Path2DElement[], globalTransform?: Matrix2D) => {
  return (element: Path2DElement) => {
    return { path, element, d, transform, stack, globalTransform }
  }
}

const exec = (name: string, input: HandlerInputType) => {
  handlers[name](input)
}

handlers.Arc = ({ path, element, d, transform, globalTransform }) => {
  if (element.type !== 'Arc') return
  const { radius, startAngle, endAngle, counterclockwise } = element
  const { x, y } = calcPoint(element, d, transform, globalTransform)
  const radius0 = {
    x: radius * transform.a,
    y: radius * transform.d
  }
  if (globalTransform) {
    radius0.x *= globalTransform.a
    radius0.y *= globalTransform.d
  }
  path.ellipse(x, y, radius0.x, radius0.y, 0, startAngle, endAngle, counterclockwise)
}

handlers.ArcTo = ({ path, element, d, transform, globalTransform }) => {
  if (element.type !== 'ArcTo') return
  const { x1, x2, y1, y2, radius } = element
  const p1 = calcPoint(new Point(x1, y1), d, transform, globalTransform)
  const p2 = calcPoint(new Point(x2, y2), d, transform, globalTransform)
  let r = radius * transform.a
  if (globalTransform) {
    r *= globalTransform.a
  }
  path.arcTo(p1.x, p1.y, p2.x, p2.y, r)
}

handlers.BezierCurveTo = ({ path, element, d, transform, globalTransform }) => {
  if (element.type !== 'BezierCurveTo') return
  const { cp1x, cp1y, cp2x, cp2y } = element
  const { x, y } = calcPoint(element, d, transform, globalTransform)
  const cp1 = calcPoint({ x: cp1x, y: cp1y }, d, transform, globalTransform)
  const cp2 = calcPoint({ x: cp2x, y: cp2y }, d, transform, globalTransform)
  path.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, x, y)
}

handlers.ClosePath = ({ path, element }) => {
  if (element.type !== 'ClosePath') return
  path.closePath()
}

handlers.Ellipse = ({ path, element, d, transform, globalTransform }) => {
  if (element.type !== 'Ellipse') return
  const { radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise } = element
  const { x, y } = calcPoint(element, d, transform, globalTransform)
  // const radius = calcPoint({ x: radiusX, y: radiusY }, transform, globalTransform)
  const radius = {
    x: radiusX * transform.a,
    y: radiusY * transform.d
  }
  if (globalTransform) {
    radius.x *= globalTransform.a
    radius.y *= globalTransform.d
  }

  path.ellipse(x, y, radius.x, radius.y, rotation, startAngle, endAngle, counterclockwise)
}

handlers.LineTo = ({ path, element, d, transform, globalTransform }) => {
  if (element.type !== 'LineTo') return
  const { x, y } = calcPoint(element, d, transform, globalTransform)
  path.lineTo(x, y)
}

handlers.MoveTo = ({ path, element, d, transform, globalTransform }) => {
  if (element.type !== 'MoveTo') return
  const { x, y } = calcPoint(element, d, transform, globalTransform)
  path.moveTo(x, y)
}

handlers.QuadraticCurveTo = ({ path, element, d, transform, globalTransform }) => {
  if (element.type !== 'QuadraticCurveTo') return
  const cp = calcPoint({ x: element.cpx, y: element.cpy }, d, transform, globalTransform)
  const p = calcPoint(element, d, transform, globalTransform)
  path.quadraticCurveTo(cp.x, cp.y, p.x, p.y)
}

handlers.Rect = ({ path, element, d, transform, globalTransform }) => {
  if (element.type !== 'Rect') return
  const { x, y, width: w, height: h } = element
  const p0 = calcPoint({ x, y }, d, transform, globalTransform)
  const p1 = calcPoint({ x: x + w, y }, d, transform, globalTransform)
  const p2 = calcPoint({ x: x + w, y: y + h }, d, transform, globalTransform)
  const p3 = calcPoint({ x: x, y: y + h }, d, transform, globalTransform)
  path.moveTo(p0.x, p0.y)
  path.lineTo(p1.x, p1.y)
  path.lineTo(p2.x, p2.y)
  path.lineTo(p3.x, p3.y)
  path.closePath()
}

handlers.Circle = ({ path, element, d, transform, stack, globalTransform }) => {
  if (element.type !== 'Circle') return
  const { x, y, radius } = element
  const pack = packager(path, d, transform, stack, globalTransform)
  exec('Ellipse', pack({ type: 'Ellipse', x, y, radiusX: radius, radiusY: radius, rotation: 0, startAngle: 0, endAngle: Math.PI * 2 }))
}

handlers.SegmentedCircle = ({ path, element, d, transform, stack, globalTransform }) => {
  if (element.type !== 'SegmentedCircle') return
  const { x, y, radius, segmentCount, smooth } = element
  const pack = packager(path, d, transform, stack, globalTransform)
  const points = drawSegmentedCircle(x, y, radius, segmentCount, smooth)
  exec('MoveTo', pack({ type: 'MoveTo', x: points[0].x, y: points[0].y }))
  for (let i = 1; i < points.length; i += 2) {
    const cp = points[i]
    const { x, y } = points[i + 1]
    exec('QuadraticCurveTo', pack({ type: 'QuadraticCurveTo', cpx: cp.x, cpy: cp.y, x, y }))
  }
}

handlers.RoundRect = ({ path, element, d, transform, stack, globalTransform }) => {
  if (element.type !== 'RoundRect') return
  const { x, y, width: w, height: h, tl, tr, bl, br } = element
  const pack = packager(path, d, transform, stack, globalTransform)
  exec('MoveTo', pack({ type: 'MoveTo', x: x + tl, y }))
  exec('LineTo', pack({ type: 'LineTo', x: x + w - tr, y }))
  exec('QuadraticCurveTo', pack({ type: 'QuadraticCurveTo', cpx: x + w, cpy: y, x: x + w, y: y + tr }))
  exec('LineTo', pack({ type: 'LineTo', x: x + w, y: y + h - br }))
  exec('QuadraticCurveTo', pack({ type: 'QuadraticCurveTo', cpx: x + w, cpy: y + h, x: x + w - br, y: y + h }))
  exec('LineTo', pack({ type: 'LineTo', x: x + bl, y: y + h }))
  exec('QuadraticCurveTo', pack({ type: 'QuadraticCurveTo', cpx: x, cpy: y + h, x, y: y + h - bl }))
  exec('LineTo', pack({ type: 'LineTo', x, y: y + tl }))
  exec('QuadraticCurveTo', pack({ type: 'QuadraticCurveTo', cpx: x, cpy: y, x: x + tl, y }))
  path.closePath()
}

handlers.Arrow = ({ path, element, d, transform, globalTransform }) => {
  if (element.type !== 'Arrow') return
  const sp = { x: element.spx, y: element.spy }
  const ep = { x: element.epx, y: element.epy }
  const points = arrow({ sp, ep }, element.length, element.direction === '>' ? 1 : -1)
  for (const point of points) {
    const { x, y } = calcPoint(point, d, transform, globalTransform)
    path.lineTo(x, y)
    path.moveTo(x, y)
  }
}

export function createPath2D (stack: Path2DElement[], d: IPoint, transform: Matrix2D, globalTransform?: Matrix2D): Path2D {
  const path = new Path2D()
  for (const element of stack) handlers[element.type]({ path, element, d, transform, stack, globalTransform })
  return path
}
