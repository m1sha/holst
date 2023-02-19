import { DOMPointCorners } from '../../../src/core/path2d/path2d-base'
import { ArcCommand, LineToCommand, MoveToCommand, RectCommand, TestCommandDispatcher } from './test-draw-command'

export default class TestPath2D implements Path2D {
  private dispatcher?: TestCommandDispatcher | null

  constructor (dispatcher?: TestCommandDispatcher | null) {
    this.dispatcher = dispatcher
  }

  addPath (path: Path2D, transform?: unknown): void {
    throw new Error('Method not implemented.')
  }

  arc (x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void {
    if (this.dispatcher) this.dispatcher.add(new ArcCommand(x, y, radius, startAngle, endAngle, counterclockwise))
  }

  arcTo (x1: number, y1: number, x2: number, y2: number, radius: number): void {
    throw new Error('Method not implemented.')
  }

  bezierCurveTo (cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
    throw new Error('Method not implemented.')
  }

  ellipse (
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    counterclockwise?: boolean
  ): void {
    throw new Error('Method not implemented.')
  }

  lineTo (x: number, y: number): void {
    if (this.dispatcher) this.dispatcher.add(new LineToCommand(x, y))
  }

  moveTo (x: number, y: number): void {
    if (this.dispatcher) this.dispatcher.add(new MoveToCommand(x, y))
  }

  quadraticCurveTo (cpx: number, cpy: number, x: number, y: number): void {
    throw new Error('Method not implemented.')
  }

  rect (x: number, y: number, w: number, h: number): void {
    if (this.dispatcher) this.dispatcher.add(new RectCommand(x, y, w, h))
  }

  roundRect (x: number, y: number, w: number, h: number, radii?: number | DOMPointCorners | (number | DOMPointCorners)[]): void {
    throw new Error('Method not implemented.')
  }

  closePath (): void {
    throw new Error('Method not implemented.')
  }
}
