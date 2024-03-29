import { Path2DElement } from './path2d-element'
import { Matrix2D, identity } from '../matrix'
import { DOMPointCorners, Path2DBase } from './path2d-base'
import { IPoint, Point } from '../geometry/point'
import { createPath2D } from './create-path2d'
import { createPoints } from './create-points'
import { Path2DRecorder } from './path2d-recorder'
import { Anchor, getAnchorPoint } from '../anchor'

export class MutablePath2D implements Path2DBase {
  private stack: Path2DElement[]
  transform: Matrix2D
  readonly recorder: Path2DRecorder

  constructor (stack?: Path2DElement[], transform?: Matrix2D) {
    this.stack = stack || []
    this.transform = transform || Matrix2D.identity
    this.recorder = new Path2DRecorder(this.stack)
  }

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

  circle (x: number, y: number, radius: number) {
    this.stack.push({ type: 'Circle', x, y, radius })
  }

  segmentedCircle (x: number, y: number, radius: number, segmentCount: number, smooth: number) {
    this.stack.push({ type: 'SegmentedCircle', x, y, radius, segmentCount, smooth })
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
    this.stack.push({ type: 'Rect', x, y, width: w, height: h })
  }

  roundRect (x: number, y: number, w: number, h: number, radii?: number | DOMPointCorners | (number | DOMPointCorners)[]): void {
  // roundRect (x: number, y: number, w: number, h: number, tl: number, tr: number, bl: number, br: number): void {
    let tl = 0; let tr = 0; let bl = 0; let br = 0
    if (radii) {
      if (typeof radii === 'number') {
        tl = radii; tr = radii; bl = radii; br = radii
      } else if (Array.isArray(radii) && typeof radii[0] === 'number' && typeof radii[1] === 'number' && typeof radii[2] === 'number' && typeof radii[3] === 'number') {
        tl = radii[0]; tr = radii[1]; bl = radii[2]; br = radii[3]
      }
    }
    this.stack.push({ type: 'RoundRect', x, y, width: w, height: h, tl, tr, bl, br })
  }

  polygon (points: {x: number; y: number}[]) {
    let moveTo = false
    for (const point of points) {
      this.lineTo(point.x, point.y)
      if (!moveTo) this.moveTo(point.x, point.y)
      moveTo = true
    }
  }

  arrow (spx: number, spy: number, epx: number, epy: number, length: number, direction: '>' | '<') {
    this.stack.push({ type: 'Arrow', spx, spy, epx, epy, length, direction })
  }

  closePath (): void {
    this.stack.push({ type: 'ClosePath' })
  }

  createPath2D (globalTransform?: Matrix2D, anchor?: Anchor): Path2D {
    const d = anchor ? getAnchorPoint(anchor) : Point.zero
    return GlobalPath2DFactory.create(this.stack, d, this.transform, globalTransform)
  }

  toPoints (anchor?: Anchor): IPoint[] {
    const d = anchor ? getAnchorPoint(anchor) : Point.zero
    return createPoints(this.stack, d, this.transform)
  }

  toOriginalSizePoints (anchor?: Anchor): IPoint[] {
    const d = anchor ? getAnchorPoint(anchor) : Point.zero
    return createPoints(this.stack, d, identity())
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

const GlobalPath2DFactory = {
  create: (stack: Path2DElement[], d: IPoint, transform: Matrix2D, globalTransform?: Matrix2D) => {
    return createPath2D(stack, d, transform, globalTransform)
  }
}

export { GlobalPath2DFactory }
