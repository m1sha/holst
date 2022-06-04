import { Path2DElement } from './types/path2d-element'
import { Matrix2D } from '../matrix'
import { Path2DBase } from './path2d-base'
import { IPoint } from '../point'
import { createPath2D } from './create-path2d'
import { createPoints } from './create-points'
// import { createFigure, updateStack } from '../primitives/figure'
// import { Figure } from '../primitives/types/figures'
import { Path2DRecorder } from './path2d-recorder'

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

  roundRect (x: number, y: number, w: number, h: number, tl: number, tr: number, bl: number, br: number): void {
    this.stack.push({ type: 'RoundRect', x, y, w, h, tl, tr, bl, br })
  }

  polygon (points: {x: number; y: number}[]) {
    for (const point of points) {
      this.lineTo(point.x, point.y)
      this.moveTo(point.x, point.y)
    }
  }

  arrow (spx: number, spy: number, epx: number, epy: number, length: number, direction: '>' | '<') {
    this.stack.push({ type: 'Arrow', spx, spy, epx, epy, length, direction })
  }

  closePath (): void {
    this.stack.push({ type: 'ClosePath' })
  }

  createPath2D (globalTransform?: Matrix2D): Path2D {
    return createPath2D(this.stack, this.transform, globalTransform)
  }

  toPoints (globalTransform?: Matrix2D): IPoint[] {
    return createPoints(this.stack, this.transform, globalTransform)
  }

  copy () {
    const result = new MutablePath2D()
    for (const i of this.stack) {
      result.stack.push(i)
    }
    result.transform = this.transform.copy()
    return result
  }

  // export (): Figure {
  //   return createFigure(this.stack)
  // }

  // import (figure: Figure): void {
  //   updateStack(this.stack, figure)
  // }
}
